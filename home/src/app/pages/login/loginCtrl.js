(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.login')
    .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$window', 'loginService', 'UserService'];
    /* @ngInject */
    function loginCtrl($rootScope, $scope, $location, $window, loginService, UserService) {

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
                var expiresIn = Math.round((new Date()).getTime() / 1000) + parseInt(response.data.expires_in);
                sessionStorage.setItem('expiresIn', expiresIn);
                
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
            

            var url = 'https://www.facebook.com/v2.8/dialog/oauth?client_id=551029818251398&redirect_uri=http://exchange-expert.cf?response_type=token';
            $window.location = url;
            
        }

        $scope.loginGoogle = function(){
            

            var url = 'https://accounts.google.com/o/oauth2/auth?client_id=472454960459-tmd9n592ddch2lt6mtrs34r1h4gfat5p.apps.googleusercontent.com&redirect_uri=http://exchange-expert.cf&scope=profile email openid&response_type=token';
            $window.location = url;
            
        }
    }
})();