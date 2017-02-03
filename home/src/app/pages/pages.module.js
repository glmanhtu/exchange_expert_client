(function () {
  'use strict';

  angular.module('ExpertExchange.pages', [
      'ui.router',
      'ExpertExchange.pages.home',
      'ExpertExchange.pages.post',
      'ExpertExchange.pages.search'
  ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider
        .otherwise('/home');
    }

})();
