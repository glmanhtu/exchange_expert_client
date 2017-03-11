(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.login')
        .controller('loginController', loginController);
    loginController.$inject = ['$scope', 'authenticationService'];
    /* @ngInject */
    function loginController($scope, authenticationService) {

        //Scope Declaration
        $scope.userName = "";
     
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

            console.log(userLogin);
     
            authenticationService.login(userLogin).then(function (response) {
                console.log('response ');
                console.log(response);
            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
     
        };
    }
})();