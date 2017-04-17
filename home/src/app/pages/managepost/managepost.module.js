(function () {
  'use strict';

  angular.module('ExpertExchange.pages.managepost', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('managepost', {
              url: '/managepost',
              templateUrl: 'app/pages/managepost/managepost.html',
              controller: 'managepostCtrl as vm',
              title: 'MangePost',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
