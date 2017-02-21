(function () {
  'use strict';

  angular.module('ExpertExchange.pages.goods', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('goods', {
              url: '/goods/:id',
              templateUrl: 'app/pages/goods/goods.html',
              title: 'Goods',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
