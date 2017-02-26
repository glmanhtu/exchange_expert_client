(function () {
  'use strict';

  angular.module('BlurAdmin.pages.location', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('location', {
          url: '/location',
          templateUrl: 'app/pages/location/location.html',
          title: 'Location',
          sidebarMeta: {
            icon: 'ion-ios-location',
            order: 12,
          },
        });
  }

})();