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
			var predicates = recognizeService.exportKeyword($scope.mapSearchString);
			predicates['location'] = {
	    		'lat' : item.lat(),
	    		'lng' : item.lng()
	    	};
	    	predicates['distance'] = $scope.distance;
			searchService.predicateSearch(predicates).then(function(response) {
				$scope.showLocationResults = false;
				$scope.searchResult = response.data.content;
    			$scope.showMapSearchTips = $scope.searchResult.length == 0;
	    		$scope.mapHasResults = $scope.searchResult.length > 0;
			}, function(error) {

			});
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
		                	predicates['distance'] = $scope.distance;
							return resolve(searchService.predicateSearch(predicates));
		                }, function(error) {
		            		reject(error)
		                });
		            } else {
	            		googleMap.searchPlace($rootScope.locationSearch).then(function(result) {
	            			$scope.showLocationResults = true;
            				$scope.placeResult = result;
            				console.log(result);
	            		}, function(error) {

	            		});
		            }
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
			search(predicates).then(function(response) {
				console.log(response);
				$scope.searchResult = response.data.content;
    			$scope.showMapSearchTips = $scope.searchResult.length == 0;
	    		$scope.mapHasResults = $scope.searchResult.length > 0;
			}, function(error) {
				console.log(error);
			});
		}	

		if ($rootScope.locationSearch && $rootScope.predicates) {
            $scope.getSearchResult();
        }	
    }

})();