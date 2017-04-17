(function () {
  'use strict';

  angular.module('ExpertExchange.pages.profile', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('profile', {
              url: '/profile/:user_id',
              templateUrl: 'app/pages/profile/profile.html',
              title: 'Profile',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            })
            .state('inbox', {
              url: '/inbox',
              templateUrl: 'app/pages/profile/inbox/inbox.html',
              title: 'Profile',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            })
            .state('inboxDetail', {
              url: '/inbox/detail/:user_id?id',
              templateUrl: 'app/pages/profile/inbox/detail.html',
              title: 'Profile',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
