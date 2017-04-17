(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = ['$rootScope', '$scope', '$state', '$location', 'toastr', 'searchService', 'DOMAIN_URL', 'recognizeService'];
    /** @ngInject */
    function searchbarCtrl($rootScope, $scope, $state, $location, toastr, searchService, DOMAIN_URL, recognizeService) {

    	$scope.showSearchTips = false;

		$scope.searchString = "";
		$rootScope.hasResults = false;
		$scope.suggestResults = [];		
		$scope.DOMAIN_URL = DOMAIN_URL;
		$rootScope.predicates;
		$scope.loading = false;

		$rootScope.closeSuggest = function() {
			$scope.suggestResults = [];
			$rootScope.hasResults = false;
			$scope.showSearchTips = false;	
			$scope.loading = false;		
		}

		$scope.searchCall = function() {
			if ($rootScope.locationSearch) {
				$rootScope.mapPage = true;
				$rootScope.mapSearchStringTrans = $scope.searchString;
				$state.go('map', {}, { reload: true });
			}
		}

		$scope.openSuggest = function(item) {
			$location.path("/goods/" + item.category.slug + "/" + item.slug);
		}

		$scope.getSearchSuggests = function() {			
			$rootScope.predicates = recognizeService.exportKeyword($scope.searchString);
			if ($scope.searchString.length < 2 || !$rootScope.isCompletedSearch) {
				$scope.suggestResults = [];
				$rootScope.hasResults = false;
				$scope.showSearchTips = true;
				return;
			}

			if ($rootScope.isCompletedSearch) {	
				$scope.loading = true;		
				$scope.showSearchTips = false;
				searchService.predicateSearch($rootScope.predicates).then(function (response) {
		    		$scope.suggestResults = response.data.content;
	    			$scope.showSearchTips = $scope.suggestResults.length == 0;
		    		$rootScope.hasResults = !$scope.showSearchTips;	
		    		$scope.loading = false;		    		
		    	}, function (response){
		    		console.log(response);
		    		$scope.loading = false;		
		    	});
			}		
		}		
    }

})();