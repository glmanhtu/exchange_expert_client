(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('loginService', loginService);
    loginService.$inject = ['$http', 'DOMAIN_URL'];
    /* @ngInject */
    function loginService($http, DOMAIN_URL) {
        this.login = function (userlogin) {
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
                    return response ;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }
    }
})();