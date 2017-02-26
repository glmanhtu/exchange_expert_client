(function () {
  'use strict';

  angular.module('BlurAdmin.pages.category', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('category', {
          url: '/category',
          templateUrl: 'app/pages/category/category.html',
          title: 'Category',
          sidebarMeta: {
            icon: 'ion-pie-graph',
            order: 11,
          },
        });
  }

})();