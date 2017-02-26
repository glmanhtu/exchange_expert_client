(function () {
  'use strict';

  angular.module('ExpertExchange.pages.register', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('register', {
              url: '/register',
              templateUrl: 'app/pages/register/register.html',
              title: 'Register',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
