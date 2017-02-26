(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('registerService', registerService);
    registerService.$inject = ['$http','DOMAIN_URL'];
    /* @ngInject */
    function registerService($http,DOMAIN_URL) {
        var service = {
            registerUser: registerUser,
            checkUser: checkUser
        };
        return service;
        ////////////////
        function checkUser(id) {
            $http.get(DOMAIN_URL + '/api/user?email=' + id).then(function() {
            	return true;
            }, function() {
            	return false;
            });
        }

        function registerUser(userData) {
        	var url = DOMAIN_URL + '/api/user';

            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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