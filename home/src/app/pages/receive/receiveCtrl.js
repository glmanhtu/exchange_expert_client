(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.receive')
        .controller('receiveCtrl', receiveCtrl);

    receiveCtrl.$inject = ['$rootScope', '$stateParams', '$location', 'loginService', 'UserService', '$window'];

    /* @ngInject */
    function receiveCtrl($rootScope, $stateParams, $location, loginService, UserService, $window) {

        var hash = $location.path().substr(1);

        var splitted = hash.split('&');
        var params = {};
        var accesstoken;

        for (var i = 0; i < splitted.length; i++) {
            var param  = splitted[i].split('=');
            var key    = param[0];
            var value  = param[1];
            params[key] = value;
            accesstoken = params;
        }        

        if (accesstoken.session_state == null) {

            loginService.loginFacebook(accesstoken.access_token).then(function (response) {

                loginService.setSesssion(response.data).then(function(response) {
                    $window.location = "/";
                });                

            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        } else {
            loginService.loginGoogle(accesstoken.access_token).then(function (response) {
                
                loginService.setSesssion(response.data).then(function(response) {
                    $location.path('/home');
                });

            }, function (error) {
                console.log('Something wrong in controller ');
                console.log(error);
            });
        }
    }    
})();