(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$rootScope', '$scope', '$location', 'toastr', 'searchService', 'DOMAIN_URL'];
    /** @ngInject */
    function searchbarCtrl($rootScope, $scope, $location, toastr, searchService, DOMAIN_URL) {

    	$scope.searchTypes = [
    		{name : "Content", value : "content"},
    		{name : "Price", value : "price"},
		    {name : "Seller Email", value : "seller"},
		    {name : "Category", value : "category"},
		    {name : "Location", value : "location"},	    
		];

		$scope.selectedType = $scope.searchTypes[0];
		$rootScope.searchString = "";
		$rootScope.hasResults = true;
		$rootScope.suggestResults = [];		
		$scope.DOMAIN_URL = DOMAIN_URL;

		$rootScope.closeSuggest = function() {
			$rootScope.suggestResults = [];
			$rootScope.hasResults = false;
			$rootScope.searchString = "";
		}

		$scope.searchCall = function() {

			switch ($scope.selectedType.value) {
				case "location":
					$location.path("/map");
					break;
				default:
					$location.path("/search");
			}			
		}

		$scope.getSearchSuggests = function() {
			if ($rootScope.searchString.length < 2) {
				$rootScope.suggestResults = [];
				$rootScope.hasResults = false;
				return;
			}			
			searchService.searchGoodsByKeyword($rootScope.searchString).then(function (response) {
	    		$rootScope.suggestResults = response.data.content;
	    		$rootScope.hasResults = $rootScope.suggestResults.length > 0;
	    		// console.log(response);
	    	}, function (response){
	    		console.log(response);
	    	});
		}		
    }

})();