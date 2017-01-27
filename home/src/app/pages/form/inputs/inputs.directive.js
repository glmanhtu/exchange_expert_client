(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('inputs', inputs);

  /** @ngInject */
  function inputs() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/form/inputs/inputs.html',
      controller: 'inputsCtrl'
    };
  }

})();