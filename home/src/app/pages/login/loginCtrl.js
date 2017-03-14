(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.login')
        .controller('loginController', loginController);
    loginController.$inject = ['$rootScope', '$scope', '$location', 'loginService'];
    /* @ngInject */
    function loginController($rootScope, $scope, $location, loginService) {

        //Scope Declaration
        $scope.responseData = "";
        $rootScope.userName = "";
     
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
                $rootScope.userName = userLogin.username;
                //Store the token information in the SessionStorage
                //So that it can be accessed for other views
                sessionStorage.setItem('userName', userLogin.username);
                sessionStorage.setItem('accessToken', response.data.access_token);
                sessionStorage.setItem('refreshToken', response.data.refresh_token);
                // window.location.href = '/Employee/Index';
                // redirect to home page
                // console.log(sessionStorage.getItem('userName'));
                $location.path('/home');
            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        };
    }
})();