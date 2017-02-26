(function () {
  'use strict';

  angular.module('ExpertExchange.pages.post', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
      console.log("aa");
        $stateProvider
            .state('post', {
              url: '/post',
              templateUrl: 'app/pages/post/post.html',
              title: 'Post',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
