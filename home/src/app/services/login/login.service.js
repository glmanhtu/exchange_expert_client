(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('loginService', loginService);
    loginService.$inject = ['$cookieStore', '$http', 'DOMAIN_URL'];
    /* @ngInject */
    function loginService($cookieStore, $http, DOMAIN_URL) {
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
                    // console.log(response.data.access_token);
                    $cookieStore.put('global', response.data);
                    // console.log($cookieStore.get('global'));
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    return response ;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }

        this.loginFacebook = function(){
            return $http({
                url: '192.168./api/oauth/token',
                method: "GET",
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