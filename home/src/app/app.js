(function () {
    'use strict';
    angular
        .module('ExpertExchange', [
        	'ngCookies',
            'ngMap',
            'textAngular',
            'toastr',
            'ui.router',
            'relativeDate',
            'ExpertExchange.pages',                 
            'ExpertExchange.theme',
            'angular-click-outside',
            'angular-input-stars'        
        ])
        .run(run);

        function run($rootScope, $location, $cookieStore, $http, toastr, loginService) {        
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                $rootScope.mapPage = false;
                if ($rootScope.closeSuggest !== undefined) {
                    $rootScope.closeSuggest();
                }                
                // redirect to login page if not logged in and trying to access a restricted page                
                var restrictedPage = $.inArray($location.path(), ['/post', '/profile']) === -1;          
                var loggedIn = sessionStorage.accessToken != null;            
                if (!restrictedPage && !loggedIn) {
                    loginService.logout();
                    toastr.error('You have to login to access this resource');
                } else if (!loggedIn) {            
                    loginService.logout();                    
                } else {
                    var expired = parseInt(sessionStorage.expiresIn) - Math.round((new Date()).getTime() / 1000);                
                    if (expired < 1) {
                        loginService.logout();
                        toastr.error('Your access token was expired, please login again');                        
                    }
                }                
            });
        }


})();
