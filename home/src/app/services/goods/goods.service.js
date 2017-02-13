(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .constant('DOMAIN_SERVICE', 'http://localhost:3000')
        .factory('goodsService', goodsService);
    goodsService.$inject = ['$http', '$rootScope', 'DOMAIN_SERVICE'];
    /* @ngInject */
    function goodsService($http, $rootScope, DOMAIN_SERVICE) {
        var service = {};

        service.test = test;
        service.GetAll = GetAll;
        service.GetById = GetById;

        console.log(service.test());

        return service;

        function test() {
            console.log("Test Service");
        }

        function GetAll() {
            return $http.get(DOMAIN_SERVICE + '/goods').then(handleSuccess, handleError('Error getting all goods'));
        }

        function GetById(id) {
            return $http.get(DOMAIN_SERVICE + '/goods/' + id).then(handleSuccess, handleError('Error getting good by id'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();