(function () {
  'use strict';

  angular.module('ExpertExchange.pages', [
      'ui.router',
      'ExpertExchange.pages.home',
      'ExpertExchange.pages.post',
      'ExpertExchange.pages.search',
      'ExpertExchange.pages.map',
      'ExpertExchange.pages.profile',
      'ExpertExchange.pages.goods',      
      'ExpertExchange.pages.receive'      
  ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider
        .otherwise('/home');
    }

})();
