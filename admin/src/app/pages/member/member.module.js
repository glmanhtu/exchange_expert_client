(function () {
  'use strict';

  angular.module('BlurAdmin.pages.member', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('member', {
          url: '/member',
          templateUrl: 'app/pages/member/member.html',
          title: 'Member',
          sidebarMeta: {
            icon: 'ion-person-stalker',
            order: 13,
          },
        });
  }

})();