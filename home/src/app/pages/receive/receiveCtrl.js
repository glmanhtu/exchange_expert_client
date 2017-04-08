(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.receive')
        .controller('receiveCtrl', receiveCtrl);

    receiveCtrl.$inject = ['$rootScope', '$stateParams', '$location', 'loginService', 'UserService'];

    /* @ngInject */
    function receiveCtrl($rootScope, $stateParams, $location, loginService, UserService) {

        var hash = $location.path().substr(1);

        var splitted = hash.split('&');
        var params = {};
        var accesstoken;

        for (var i = 0; i < splitted.length; i++) {
            var param  = splitted[i].split('=');
            var key    = param[0];
            var value  = param[1];
            params[key] = value;
            accesstoken=params;
        }
        console.log(accesstoken.access_token);
        console.log(accesstoken.session_state);

        if(accesstoken.session_state==null){

            loginService.loginFacebook(accesstoken.access_token).then(function (response) {

            setSesssion(response, UserService, $rootScope);

            $location.path('/home');

            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        }else{
            loginService.loginGoogle(accesstoken.access_token).then(function (response) {
                
            setSesssion(response, UserService, $rootScope);

            $location.path('/home');

            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        }
    }

    function setSesssion(response, UserService, $rootScope){
        sessionStorage.setItem('accessToken', response.data.access_token);
            sessionStorage.setItem('refreshToken', response.data.refresh_token);
            var expiresIn = Math.round((new Date()).getTime() / 1000) + parseInt(response.data.expires_in);
            sessionStorage.setItem('expiresIn', expiresIn);

            UserService.GetCurrentUser(response.data.access_token).then(function (response) {
                console.log(response);
                $rootScope.userProfile = response;
                sessionStorage.setItem('userFirstName', response.firstName);
                // console.log($rootScope.userProfile.firstName);
            }, function (error) {
                console.log(error);
            });
    }
})();