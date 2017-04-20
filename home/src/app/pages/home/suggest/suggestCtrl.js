(function () {
    'use strict';

    angular.module('ExpertExchange.pages.home')
        .controller('suggestCtrl', suggestCtrl);

    /** @ngInject */
    function suggestCtrl($scope, $location, searchService, DOMAIN_URL) {
    	$scope.items = {};
        $scope.DOMAIN_URL = DOMAIN_URL;
    	searchService.suggestGoods().then(function (response) {
    		$scope.items = response.data.content;
    		// console.log(response);
    	}, function (response){
    		console.log(response);
    	});
    }

})();