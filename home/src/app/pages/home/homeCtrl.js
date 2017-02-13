(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.home')
        .constant('DOMAIN_SERVICE', 'http://localhost:3000')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$http','$timeout','goodsService', 'DOMAIN_SERVICE'];
    /* @ngInject */
    function homeCtrl($http, $scope, $timeout, DOMAIN_SERVICE, goodsService) {

    	console.log("homeCtrl");

    	var vm = this;

    	(function initController($scope, goodsService) {
            // reset login status
            listGoods();
            // getGood('978-0641723445')

            $http.get(DOMAIN_SERVICE + '/goods').
            then(function(response) {
                $scope.dataGoods = response.data;
                console.log(response.data);
            });

            
        })();

        function listGoods() {
	        goodsService.GetAll()
	            .then(function (response) {
                    $scope.dataGoods = response.data;
	                console.log(response);
	            }, function (error) {
	                console.log(error);
	            });
	    	
	    }

        function getGood(id) {
            goodsService.GetById(id)
                .success(function (response) {
                    $scope.dataGoods = response.data;
                    console.log(response);
                })
                .error(function (error) {
                    console.log(error);
                });
        }

    }
})();