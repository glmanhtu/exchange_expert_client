(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchmapCtrl', searchmapCtrl);
    searchmapCtrl.$inject = ['$rootScope', '$scope', '$location', 'toastr', 'searchService', 'DOMAIN_URL', 'recognizeService', '$q', 'googleMap'];
    /** @ngInject */
    function searchmapCtrl($rootScope, $scope, $location, toastr, searchService, DOMAIN_URL, recognizeService, $q, googleMap) {

    	$scope.showMapSearchTips = false;
    	$scope.distance = 100000;    	
    	$scope.showLocationResults = false;
    	var currentLocation = ['me', 'location'];    
		$scope.mapSearchString = $rootScope.mapSearchStringTrans;
		$scope.mapHasResults = false;
		$scope.searchResult = [];
		$scope.placeResult=[];
		$scope.DOMAIN_URL = DOMAIN_URL;	
		$scope.loading = false;	

        function belongTo(arr, subject) {
            for (var i = 0; i < arr.length; i++) {
                if (subject.indexOf(arr[i]) > -1) {
                    return true;
                }
            }
            return false;
        }		

		$scope.closeSuggest = function() {			
			$scope.mapHasResults = false;
			$scope.showMapSearchTips = false;		
			$scope.showLocationResults = false;	
			$scope.loading = false;	
		}

		$scope.showCurrentSuggest = function() {
			if ($scope.searchResult.length > 0 && !$scope.mapHasResults) {
				$scope.mapHasResults = true;
			} else if ($scope.placeResult.length > 0 && !$scope.showLocationResults) {
				$scope.showLocationResults = true;			
			} else {
				$scope.showMapSearchTips = true;		
			}
		}

		$scope.openGood = function(item) {
			$location.path("/goods/" + item.category.slug + "/" + item.slug);
		}

		$scope.getSearchByLocation = function(item) {
			$scope.loading = true;			
			var predicates = recognizeService.exportKeyword($scope.mapSearchString);
			predicates['location'] = {
	    		'lat' : item.lat(),
	    		'lng' : item.lng()
	    	};
	    	$scope.lastSelectedLocation = predicates['location'];
	    	predicates['distance'] = $scope.distance;
			searchService.predicateSearch(predicates).then(function(response) {
				setResultView(response.data.content, item.lat(), item.lng());
				$scope.loading = false;	
			}, function(error) {

			});
		}

		function setResultView(result, lat, lng) {
			$scope.showLocationResults = false;
			$scope.searchResult = result;
			for (var i = 0; i < $scope.searchResult.length; i++) {
				var minDistanceLocation = getClosedLocation($scope.searchResult[i].location, lat, lng);
				$scope.searchResult[i]['distance'] = minDistanceLocation.distance;
				$scope.searchResult[i].location = [minDistanceLocation.coordinate];
			}							
			console.log($scope.searchResult);
			$scope.showMapSearchTips = $scope.searchResult.length == 0;
    		$scope.mapHasResults = $scope.searchResult.length > 0;
		}

		function getClosedLocation(locations, lat, lng) {
			var minLocation = {};
			minLocation.coordinate = locations[0];
			minLocation.distance = distanceInKmBetweenEarthCoordinates(minLocation.coordinate.lat, minLocation.coordinate.lon, lat, lng);
			for (var i = 0; i < locations.length; i++) {
				var distance = distanceInKmBetweenEarthCoordinates(locations[i].lat, locations[i].lon, lat, lng);
				if (minLocation.distance < distance) {
					minLocation.distance = distance;
					minLocation.coordinate = locations[i];
				}
			}
			return minLocation;
		}

		function degreesToRadians(degrees) {
		  	return degrees * Math.PI / 180;
		}

		function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
		  	var earthRadiusKm = 6371;

		  	var dLat = degreesToRadians(lat2-lat1);
		  	var dLon = degreesToRadians(lon2-lon1);

		  	lat1 = degreesToRadians(lat1);
		  	lat2 = degreesToRadians(lat2);

		  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	          	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  	return Math.round(earthRadiusKm * c * 100)/100;
		}

		function search(predicates) {					
			return $q(function(resolve, reject) {
				if ($rootScope.isCompletedSearch && $rootScope.locationSearch) {
					if (belongTo(currentLocation, $rootScope.locationSearch)) {           	
		                $scope.getCurrentLocation().then(function(response) {
		                	console.log(response);
		                	predicates['location'] = {
		                		'lat' : response.lat,
		                		'lng' : response.lng
		                	};
		                	$scope.lastSelectedLocation = predicates['location'];
		                	predicates['distance'] = $scope.distance;
		                	console.log($scope.lastSelectedLocation);
							return resolve(searchService.predicateSearch(predicates));
		                }, function(error) {
		            		reject(error)
		                });
		            } else {
	            		googleMap.searchPlace($rootScope.locationSearch).then(function(result) {
	            			$scope.showLocationResults = true;
            				$scope.placeResult = result;            				
	            		}, function(error) {

	            		});
		            }
	        	} else if ($rootScope.isCompletedSearch) {
	        		return resolve(searchService.predicateSearch(predicates));
	        	}
			});			
		}

		$scope.getSearchResult = function() {
			var predicates = recognizeService.exportKeyword($scope.mapSearchString);
			if ($scope.mapSearchString.length < 2 || !$rootScope.isCompletedSearch) {
				$scope.searchResult = [];
				$scope.mapHasResults = false;
				$scope.showMapSearchTips = true;
				return;
			}
			$scope.loading = true;	
			$scope.showMapSearchTips = false;
			search(predicates).then(function(response) {
				setResultView(response.data.content, $rootScope.expectedLocation.lat, $rootScope.expectedLocation.lng);
				$scope.loading = false;	
			}, function(error) {
				console.log(error);
			});
		}	

		if ($rootScope.locationSearch && $rootScope.predicates) {
            $scope.getSearchResult();
        }	
    }

})();