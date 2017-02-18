(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('searchbarCtrl', searchbarCtrl);
    searchbarCtrl.$inject = [];
    /** @ngInject */
    function searchbarCtrl($scope, $location) {
    	// $scope.searchString = 'Search Keyword';

    	// $scope.startSearch = function(){
    	// 	$location.path("/search");
    	// 	console.log("Test Enter");
    	// };

    	// $scope.myFunc = function() {
    	// 	console.log("Test");
    	// };


    }

})();