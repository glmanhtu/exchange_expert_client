(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchmapCtrl', searchmapCtrl);
    searchmapCtrl.$inject = ['$rootScope', '$scope', '$location', 'toastr', 'searchService', 'DOMAIN_URL', 'recognizeService', '$q'];
    /** @ngInject */
    function searchmapCtrl($rootScope, $scope, $location, toastr, searchService, DOMAIN_URL, recognizeService, $q) {

    	$scope.showMapSearchTips = false;
    	$scope.distance = 100000;
    	var currentLocation = ['me', 'location'];    
		$scope.mapSearchString = $rootScope.mapSearchStringTrans;
		$scope.mapHasResults = false;
		$scope.searchResult = [];		
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
		}

		$scope.searchCall = function() {			
		}

		$scope.openGood = function(item) {
			$location.path("/goods/" + item.category.slug + "/" + item.slug);
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