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
    ]).run(['$cookieStore', '$http', function($cookieStore, $http) {
      if($cookieStore.get('global') != null){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookieStore.get('global').access_token;
      }
    }]);
  })();