(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('filterbar', filterbar);

  /** @ngInject */
  function filterbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/form/filter/filter.html',
      controller: 'filterCtrl'
    };
  }

})();