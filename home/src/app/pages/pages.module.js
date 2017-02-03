(function () {
  'use strict';

  angular.module('ExpertExchange.pages', [
      'ui.router',
      'ExpertExchange.pages.home'
  ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider
        .otherwise('/home');
    }

})();
