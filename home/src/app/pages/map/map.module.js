(function () {
  'use strict';

  angular.module('ExpertExchange.pages.map', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('map', {
              url: '/map',
              templateUrl: 'app/pages/map/map.html',
              controller: 'mapCtrl',
              title: 'Map'
            });
      }

})();
