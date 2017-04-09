(function () {
  'use strict';

  angular.module('ExpertExchange.pages', [
      'ui.router',
      'ExpertExchange.pages.home',
      'ExpertExchange.pages.post',
      'ExpertExchange.pages.search',
      'ExpertExchange.pages.profile',
      'ExpertExchange.pages.goods',      
      'ExpertExchange.pages.receive',
      'ExpertExchange.pages.register',
  ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        // $urlRouterProvider
        // .otherwise('/home');
    }

})();
