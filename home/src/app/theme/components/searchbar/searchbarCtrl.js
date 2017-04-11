(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$rootScope', '$scope', '$location', '$window', 'toastr'];
    /** @ngInject */
    function searchbarCtrl($rootScope, $scope, $location, $window, toastr) {

    	$scope.locationList = [
    		{name : "Anywhere", value : "anywhere"},
    		{name : "My location", value : "current"},
		    {name : "Custom", value : "custom"}		    
		];

		var key = $location.search();
		$rootScope.expectedLocation = "";

		if (key.location == null)
			$scope.selectedLocation = $scope.locationList[0];
		else
			$scope.selectedLocation = key.location;

		if (key.searchString == null)
			$scope.searchString = "";
		else
			$scope.searchString = key.searchString;

		$scope.searchCall = function() {
			// console.log("SearchCall");
			$rootScope.searchString = $scope.searchString;
			if ($rootScope.expectedLocation != "") {
				$location.path("/map");
			} else {
				$location.path("/search");
			}
		}

		$scope.changeSearchLocation = function(searchType) {
			console.log(searchType);
			if (searchType == "anywhere") {
				$rootScope.expectedLocation = "";
			} else if (searchType == "current") {
				getCurrentLocation()
			} else {
				toastr.warning('Not implemented yet');
			}
		}

		function getCurrentLocation() {
			toastr.info('Detecting your location');
			if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(location) {
		        	$rootScope.expectedLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
		        	toastr.success('Found your location');
		        	console.log($rootScope.expectedLocation);
		        });
		    } else {
		        toastr.error('This browser not support to get your location');
		    }
		}

    }

})();