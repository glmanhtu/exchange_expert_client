(function () {
  'use strict';

  angular.module('ExpertExchange.pages.search', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('search', {
              url: '/search',
              templateUrl: 'app/pages/search/search.html',
              title: 'Search-page',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
