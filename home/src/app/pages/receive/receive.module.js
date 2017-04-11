(function () {
  'use strict';

  angular.module('ExpertExchange.pages.receive', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('receive', {
              url: '/access_token=:accessToken',
              templateUrl: 'app/pages/receive/receive.html',
              title: 'receive',
              controller: 'receiveCtrl'
            });
      }

})();
