(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('authenticationService', authenticationService);
    authenticationService.$inject = ['$http', 'DOMAIN_URL'];
    /* @ngInject */
    function authenticationService($http, DOMAIN_URL) {
        // var urlAPI = DOMAIN_URL + '/api/oauth/token';
        var loginService = {
            login : login
        };
        return loginService;
        ////////////////
        function login (userlogin) {
            return $http({
                url: DOMAIN_URL + '/api/oauth/token',
                method: "POST",
                data: $.param({
                    grant_type: 'password',
                    username: userlogin.username, 
                    password: userlogin.password,
                    client_id: 'default' 
                }),
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ZGVmYXVsdDo='
                },
            }).then(
                function (response) {
                    console.log('response');
                    console.log(response);
                    return response ;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }

    }
})();