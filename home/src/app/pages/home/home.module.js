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
            controller: 'homeCtrl',
            
          });
    }

})();
