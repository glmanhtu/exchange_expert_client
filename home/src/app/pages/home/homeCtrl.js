(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.home')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$http','$timeout','goodService', 'DOMAIN_SERVICE'];
    /* @ngInject */
    function homeCtrl($http, $scope, $timeout, DOMAIN_SERVICE, goodService) {

    	console.log("homeCtrl");

    	var vm = this;

    	(function initController($scope, goodService) {
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
	        goodService.GetAll()
	            .then(function (response) {
                    $scope.dataGoods = response.data;
	                console.log(response);
	            }, function (error) {
	                console.log(error);
	            });
	    	
	    }

        function getGood(id) {
            goodService.GetById(id)
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