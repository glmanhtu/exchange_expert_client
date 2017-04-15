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
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    return response;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }

        this.loginFacebook = function(access_token){
            return $http({
                url: DOMAIN_URL + '/api/login/facebook?accessToken=' + access_token,
                method: "GET",
                headers: {
                    'Authorization': undefined
                },
            }).then(
                function (response) {        
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    return response;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }

        this.loginGoogle = function(access_token){
            return $http({
                url: DOMAIN_URL + '/api/login/google?accessToken=' + access_token,
                method: "GET",
                headers: {
                    'Authorization': undefined
                },
            }).then(
                function (response) {        
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                    return response;
                }, function (error) {
                    console.log('Something wrong in service login');
                    console.log(error);
                });
        }

        this.logout = function() {
            console.log("called logout");
            sessionStorage.removeItem('userProfile');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');   
            $http.defaults.headers.common['Authorization'] = undefined;
            delete $rootScope.userProfile;       
        }
    }

})();