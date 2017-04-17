(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('loginService', loginService);
    loginService.$inject = ['$cookieStore', '$http', 'DOMAIN_URL', '$rootScope', '$q', 'UserService'];
    /* @ngInject */
    function loginService($cookieStore, $http, DOMAIN_URL, $rootScope, $q, UserService) {
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

        this.setSesssion = function(authData){
            var deferred = $q.defer();
            sessionStorage.setItem('accessToken', authData.access_token);            
            var expiresIn = Math.round((new Date()).getTime() / 1000) + parseInt(authData.expires_in);
            sessionStorage.setItem('expiresIn', expiresIn);

            UserService.GetCurrentUser().then(function (response) {                
                $rootScope.userProfile = response;
                sessionStorage.setItem('userProfile', JSON.stringify(response));
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        this.logout = function() {
            console.log("called logout");
            sessionStorage.removeItem('userProfile');            
            sessionStorage.removeItem('accessToken');            
            $http.defaults.headers.common['Authorization'] = undefined;
            delete $rootScope.userProfile;
            setTimeout(function () {
                window.location.reload();
            },1000);

        }
    }

})();