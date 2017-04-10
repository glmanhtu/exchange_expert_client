(function () {
  'use strict';
  angular.module('BlurAdmin', [  
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',  
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',  
    'angular-progress-button-styles',
    'ngCookies',

    'BlurAdmin.theme',
    'BlurAdmin.pages'
    ]).run(run);

    function run($rootScope, $location, $cookieStore, $http, toastr) {
        $rootScope.auth = $cookieStore.get('auth') || {};

        if ('access_token' in $rootScope.auth != null) {
          $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.auth.access_token;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;          
            var loggedIn = $rootScope.auth.access_token;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }            
            var expired = parseInt($rootScope.auth.expires_in) - Math.round((new Date()).getTime() / 1000);
            if (expired < 1) {
              toastr.error('Access token was expired');
              $location.path('/login');
            }
        });
    }
  })();