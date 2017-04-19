(function () {
  'use strict';

  angular.module('ExpertExchange.pages.editpost', [])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('editpost', {
              url: '/editpost/:category_slug/:good_slug',
              templateUrl: 'app/pages/editpost/editpost.html',
              controller: 'editpostCtrl',
              title: 'Editpost',
              sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
              },
            });
      }

})();
