(function () {
    'use strict';

    angular.module('ExpertExchange.pages.home')
        .controller('suggestCtrl', suggestCtrl);

    /** @ngInject */
    function suggestCtrl($scope, $location, searchService) {
    	$scope.items = {};

    	searchService.getGoods().then(function (response) {
    		$scope.items = response.data;
    		console.log(response);
    	}, function (response){
    		console.log(response);
    	});
    }

})();