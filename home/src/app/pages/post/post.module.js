(function () {
  'use strict';

  angular.module('ExpertExchange.pages.post', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('post', {
              url: '/post',
              templateUrl: 'app/pages/post/post.html',
              controller: 'postCtrl',
              title: 'Post',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
