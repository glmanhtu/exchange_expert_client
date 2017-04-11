(function () {
  'use strict';

  angular.module('ExpertExchange.pages.goods', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('goods', {
              url: '/goods/:category_slug/:good_slug',
              templateUrl: 'app/pages/goods/goods.html',
              controller: 'goodsCtrl',
              title: 'Goods',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
