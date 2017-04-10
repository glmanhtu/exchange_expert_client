(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$scope', '$location', '$window', '$rootScope', 'toastr'];
    /** @ngInject */
    function searchbarCtrl($scope, $location, $window, $rootScope, toastr) {

    	$scope.locationList = [
    		{name : "Anywhere", value : "anywhere"},
    		{name : "My location", value : "current"},
		    {name : "Custom", value : "custom"}		    
		];

		var key = $location.search();
		$scope.expectedLocation = "";

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
			$rootScope.selectedLocation = $scope.selectedLocation;
			if ($scope.searchString != null) {
	            $window.location = '#/search?searchString=' + $scope.searchString + '&location=' + $scope.selectedLocation;
	            location.reload();
	        }
		}

		$scope.changeSearchLocation = function(searchType) {
			console.log(searchType);
			if (searchType == "anywhere") {
				$scope.expectedLocation = "";
			} else if (searchType == "current") {
				getCurrentLocation()
			} else {
				toastr.warning('Not implemented yet');
			}
		}

		function getCurrentLocation() {
			if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(location) {
		        	$scope.expectedLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
		        	console.log($scope.expectedLocation);
		        });
		    } else {
		        toastr.error('This browser not support to get your location');
		    }
		}

    }

})();