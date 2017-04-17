(function () {
  'use strict';

  angular.module('BlurAdmin.pages.posts', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('posts', {
          url: '/posts',
          templateUrl: 'app/pages/posts/posts.html',
          title: 'Exchange Posts',
          controller: 'postsCtrl  as vm',
          sidebarMeta: {
            icon: 'ion-android-archive',
            order: 10,
          },
        });
  }
})();