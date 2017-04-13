(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$rootScope', '$scope', '$location', 'toastr', 'searchService', 'DOMAIN_URL', 'recognizeService'];
    /** @ngInject */
    function searchbarCtrl($rootScope, $scope, $location, toastr, searchService, DOMAIN_URL, recognizeService) {

    	$scope.showSearchTips = false;

		$rootScope.searchString = "";
		$rootScope.hasResults = false;
		$rootScope.suggestResults = [];		
		$scope.DOMAIN_URL = DOMAIN_URL;

		$rootScope.closeSuggest = function() {
			$rootScope.suggestResults = [];
			$rootScope.hasResults = false;
			$scope.showSearchTips = false;
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

		$scope.openSuggest = function(item) {
			$location.path("/goods/" + item.category.slug + "/" + item.slug);
		}

		$scope.getSearchSuggests = function() {
			recognizeService.exportKeyword($rootScope.searchString);
			// if ($rootScope.searchString.length < 2) {
			// 	$rootScope.suggestResults = [];
			// 	$rootScope.hasResults = false;
			// 	$scope.showSearchTips = true;
			// 	return;
			// }			
			// searchService.searchGoodsByKeyword($rootScope.searchString).then(function (response) {
	  //   		$rootScope.suggestResults = response.data.content;
   //  			$scope.showSearchTips = $rootScope.suggestResults.length == 0;
	  //   		$rootScope.hasResults = $rootScope.suggestResults.length > 0;
	  //   		// console.log(response);
	  //   	}, function (response){
	  //   		console.log(response);
	  //   	});
		}		
    }

})();