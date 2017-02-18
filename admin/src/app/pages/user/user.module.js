(function () {
  'use strict';

  angular.module('BlurAdmin.pages.user', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: 'app/pages/user/user.html',
          title: 'User',
          sidebarMeta: {
            icon: 'ion-man',
            order: 14,
          },
        });
  }

})();