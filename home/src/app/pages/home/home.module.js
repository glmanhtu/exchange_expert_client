(function () {
  'use strict';

  angular.module('ExpertExchange.pages.home', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home', {
              url: '/home',
              templateUrl: 'app/pages/home/home.html',
              title: 'Homepage',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            })
            .state('post', {
              url: '/post',
              templateUrl: 'app/pages/form/inputs/inputs.html',
              title: 'Post',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            })
            .state('filter', {
              url: '/filter',
              templateUrl: 'app/pages/form/filter/filter.html',
              title: 'Filter',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
