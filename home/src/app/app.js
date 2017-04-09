(function () {
    'use strict';
    angular
        .module('ExpertExchange', [
        	'ngCookies',
            'ngMap',
            'textAngular',
            'toastr',
            'ui.router',           
            'ExpertExchange.pages',                 
            'ExpertExchange.theme',
            'angular-input-stars'          
        ])
        .run(run);

        function run($rootScope, $location, $cookieStore, $http, toastr) {        
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page                
                var restrictedPage = $.inArray($location.path(), ['/post', '/profile']) === -1;          
                var loggedIn = sessionStorage.accessToken != null;            
                if (!restrictedPage && !loggedIn) {
                    toastr.error('You have to login to access this resource');
                } else if (!loggedIn) {            
                    delete sessionStorage.accessToken;
                    $http.defaults.headers.common['Authorization'] = undefined;                    
                } else {
                    var expired = parseInt(sessionStorage.expiresIn) - Math.round((new Date()).getTime() / 1000);                
                    if (expired < 1) {
                        delete sessionStorage.accessToken;
                        $http.defaults.headers.common['Authorization'] = undefined;
                        toastr.error('Your access token was expired, please login again');                        
                    }
                }                
            });
        }


})();
