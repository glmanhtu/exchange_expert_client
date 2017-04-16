(function() {
    'use strict';
    angular
    .module('BlurAdmin.pages.login')
    .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$window', '$interval', 'loginService', 'UserService', '$cookieStore', 'toastr'];
    /* @ngInject */
    function loginCtrl($rootScope, $scope, $location, $window, $interval, loginService, UserService, $cookieStore, toastr) {

        //Scope Declaration        
        $scope.accessToken = "";        

        //Function to Login. This will generate Token 
        $scope.login = function (username, password) {
            //This is the information to pass for token based authentication
            var userLogin = {
                username: $scope.userLoginEmail,
                password: $scope.userLoginPassword
            };

            loginService.login(userLogin).then(function (response) {   
                console.log(response);
                if ('access_token' in response.data) {
                    response.data.expires_in = Math.round((new Date()).getTime() / 1000) + parseInt(response.data.expires_in);
                    $cookieStore.put('auth', response.data);    
                    $rootScope.auth = response.data;
                    UserService.GetByEmail(userLogin.username).then(function (response) {
                        $rootScope.userProfile = response;
                        $location.path('/home');
                    }, function (response) {
                        console.log(response);
                    });                                        
                } else {
                    toastr.error('User name or password incorrect');
                }                
            }, function (error) {
                toastr.error('User name or password incorrect');
                console.log(error);
            });
        };
    }
})();