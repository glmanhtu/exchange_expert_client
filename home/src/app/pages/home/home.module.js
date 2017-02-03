(function () {
  'use strict';

  angular.module('ExpertExchange.pages.home', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
      console.log("aa");
        $stateProvider
            .state('home', {
              url: '/home',
              templateUrl: 'app/pages/home/home.html',
              title: 'Homepage',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
