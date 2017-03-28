(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$scope', '$location', '$window', '$rootScope'];
    /** @ngInject */
    function searchbarCtrl($scope, $location, $window, $rootScope) {

    	$scope.locationList = [
    		{name : "All", value : "all"},
		    {name : "Ho Chi Minh", value : "hochiminh"},
		    {name : "Ha Noi", value : "hanoi"},
		    {name : "Da Nang", value : "danang"}
		];

		var key = $location.path('/search').search(); key.searchString,key.location

		if (key.location == null)
			$scope.selectedLocation = "all";
		else
			$scope.selectedLocation = key.location;

		if (key.searchString == null)
			$scope.searchString = "";
		else
			$scope.searchString = key.searchString;

		console.log($rootScope);

		$scope.searchCall = function() {
			console.log("SearachCall");
			$rootScope.searchString = $scope.searchString;
			$rootScope.selectedLocation = $scope.selectedLocation;
            $window.location = '#/search?searchString=' + $scope.searchString + '&location=' + $scope.selectedLocation;
            location.reload();
		}

    }

})();