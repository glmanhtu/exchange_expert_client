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
            if ('accessToken' in sessionStorage != null) {
              $http.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.accessToken;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;          
                var loggedIn = sessionStorage.accessToken;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }            
                var expired = parseInt(accessToken.expiresIn) - Math.round((new Date()).getTime() / 1000);
                if (expired < 1) {
                  toastr.error('Access token was expired');
                  $location.path('/login');
                }
            });
        }
})();
