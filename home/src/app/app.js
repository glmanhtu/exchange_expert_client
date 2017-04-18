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
            'angular-input-stars',
            'ui.bootstrap'
        ])
        .run(run);

    function run($rootScope, $location, $cookieStore, $http, toastr, loginService, GOOGLE_MAP_KEY) {        
        $rootScope.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY;        

        if ((sessionStorage.userProfile) != null){            
            $rootScope.userProfile = JSON.parse(sessionStorage.userProfile);
        } else {
            delete $rootScope.userProfile;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.GMapAutocomplete = "";
            if ($location.path() != '/map') {
                $rootScope.mapPage = false;                
            }
            if ($rootScope.closeSuggest !== undefined) {
                $rootScope.closeSuggest();
            }
            // redirect to login page if not logged in and trying to access a restricted page                
            var restrictedPage = $.inArray($location.path(), ['/post', '/profile']) === -1;                          
            if (!restrictedPage && !sessionStorage.accessToken) {
                toastr.error('You have to login to access this resource');
            } else if (sessionStorage.accessToken) {
                var expired = parseInt(sessionStorage.expiresIn) - Math.round((new Date()).getTime() / 1000);                
                if (expired < 1) {
                    loginService.logout();
                    toastr.error('Your access token was expired, please login again');                        
                } else {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.accessToken;
                }
            }            
        });
    }
})();
