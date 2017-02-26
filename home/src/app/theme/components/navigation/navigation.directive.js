(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('navigation', navigation);

  /** @ngInject */
  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/navigation/navigation.html',
      controller: 'navigationCtrl'
    };
  }

})();