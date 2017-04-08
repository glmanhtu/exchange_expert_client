(function () {
  'use strict';

  angular.module('ExpertExchange.pages.login.receive', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('receive', {
              url: '/login/receive',
              templateUrl: 'app/pages/login/receive/receive.html',
              title: 'receive',
              controller: 'receiveCtrl',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
