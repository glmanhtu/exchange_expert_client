(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
              url: '/login',
              views: {
                'globalView': {
                    templateUrl: 'app/pages/login/login.html',
                    title: 'login',
                    controller: 'loginCtrl'
                }
              }            
            });
      }

})();
