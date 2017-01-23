(function () {
  'use strict';

  angular.module('DefaultModule.theme.components')
      .directive('sidebar', sidebar);

  /** @ngInject */
  function sidebar() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/sidebar/sidebar.html',
      controller: 'sidebarCtrl'
    };
  }

})();