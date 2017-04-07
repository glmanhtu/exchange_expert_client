(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.login')
    .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$window', '$interval', 'loginService', 'UserService'];
    /* @ngInject */
    function loginCtrl($rootScope, $scope, $location, $window, $interval, loginService, UserService) {

        //Scope Declaration
        $scope.responseData = "";

        $scope.userLoginEmail = "";
        $scope.userLoginPassword = "";

        $scope.accessToken = "";
        $scope.refreshToken = "";

        //Function to Login. This will generate Token 
        $scope.login = function () {
            //This is the information to pass for token based authentication
            var userLogin = {
                username: $scope.userLoginEmail,
                password: $scope.userLoginPassword
            };

            loginService.login(userLogin).then(function (response) {
                // $rootScope.userEmail = userLogin.username;
                // console.log($rootScope.userEmail);
                // Store the token information in the SessionStorage
                // So that it can be accessed for other views
                sessionStorage.setItem('userName', userLogin.username);
                sessionStorage.setItem('accessToken', response.data.access_token);
                sessionStorage.setItem('refreshToken', response.data.refresh_token);
                
                UserService.GetByEmail(userLogin.username).then(function (response) {
                    $rootScope.userProfile = response;
                    sessionStorage.setItem('userFirstName', response.firstName);
                    // console.log($rootScope.userProfile.firstName);
                }, function (response) {
                    console.log(response);
                });

                $location.path('/home');
            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        };

        $scope.loginFacebook = function(){
            var url = 'http://125.253.123.26:8080/api/login/facebook';
            var urlAuth = 'http://125.253.123.26:8080/api/oauth/authorize?response_type=code&client_id=default&redirect_uri=http://localhost:9999/token';
            var windowChild = $window.open(url);
            var intervalID=0;
            // console.log('cuc');
            // checkWindow();

            function checkWindow(){
                // console.log('cuc');
                if(windowChild.closed && windowChild){
                    console.log('cuc');
                    $interval.cancel(intervalID);
                    $window.location.href = urlAuth;
                }

            };
            
            intervalID = $interval(checkWindow, 500);

            // loginService.loginFacebook
        }


    }
})();