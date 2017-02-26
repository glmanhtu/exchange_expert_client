(function () {
  'use strict';

  angular.module('ExpertExchange.pages.profile', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
              url: '/profile',
              templateUrl: 'app/pages/profile/profile.html',
              title: 'Profile',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
