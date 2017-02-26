/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.posts',
    'BlurAdmin.pages.category',
    'BlurAdmin.pages.location',
    'BlurAdmin.pages.member',
    'BlurAdmin.pages.user',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard'); 
  }

})();
