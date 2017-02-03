(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('homepage', homepage);

  /** @ngInject */
  function homepage() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/home/home.html',
      controller: 'homeCtrl'
    };
  }

})();