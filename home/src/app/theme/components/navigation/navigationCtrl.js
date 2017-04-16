(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('navigationCtrl', navigationCtrl);
        navigationCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'loginService', 'UserService', 'toastr', 'registerService'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location, $http, loginService, UserService, toastr, registerService) {

        $scope.loginParams = {};
        $scope.registerParams = {};
        $scope.avatar = "assets/img/no-photo.png";

        if ($rootScope.userProfile.avatar != null) {
            $scope.avatar = $rootScope.userProfile.avatar;
        }            

        $scope.logout = function () {
            loginService.logout();
        };

        //Function to Login. This will generate Token 
        $scope.login = function () {          
            loginService.login($scope.loginParams).then(function (response) {

                if (response != null) {
                    loginService.setSesssion(response.data).then(function(response) {
                        $scope.avatar = response.avatar;
                        toastr.success("Welcome back, " + response.firstName + " " + response.lastName);                    
                    });                    
                } else {
                    toastr.error('Username or password incorrect');    
                }
            }, function (error) {
                toastr.error('Username or password incorrect');
                console.log(error);
            });
        };

        $scope.register = function() {       
            console.log("Staring register");
            registerService.registerUser($scope.registerParams).then(function(registerResponse) {                
                var loginData = {"username" : $scope.registerParams.id, "password" : $scope.registerParams.password};
                loginService.login(loginData).then(function(loginResponse) {
                    sessionStorage.setItem('accessToken', loginResponse.data.access_token);
                    sessionStorage.setItem('refreshToken', loginResponse.data.refresh_token);
                    var expiresIn = Math.round((new Date()).getTime() / 1000) + parseInt(loginResponse.data.expires_in);
                    sessionStorage.setItem('expiresIn', expiresIn);
                    $rootScope.userProfile = registerResponse;
                    $scope.avatar = registerResponse.avatar;
                    sessionStorage.setItem('userProfile', JSON.stringify(registerResponse)); 
                    toastr.success("Welcome to Exchange Expert, " + registerResponse.firstName + " " + registerResponse.lastName);                   
                }, function (error) {
                    toastr.error("An error occurred when we try to automatic login you. Please try login again");
                });
            }, function(error) {
                toastr.error("Email already exists");
            });
        };

        $scope.loginFacebook = function(){        
            var url = 'https://www.facebook.com/v2.8/dialog/oauth?client_id=551029818251398&redirect_uri=http://exchange-expert.cf?display=popup&response_type=token';
            window.location = url;
        }

        $scope.loginGoogle = function(){        
            var url = 'https://accounts.google.com/o/oauth2/auth?client_id=472454960459-tmd9n592ddch2lt6mtrs34r1h4gfat5p.apps.googleusercontent.com&redirect_uri=http://exchange-expert.cf&scope=profile email openid&response_type=token';
            window.location = url;
        }
    }

})();