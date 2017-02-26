(function () {
  'use strict';

  angular.module('ExpertExchange.pages.profile')
      .directive('plugins', plugins);

  /** @ngInject */
  function plugins() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/profile/plugins/plugins.html',
      controller: 'pluginsCtrl'
    };
  }

})();