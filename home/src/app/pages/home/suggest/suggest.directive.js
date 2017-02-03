(function () {
  'use strict';

  angular.module('ExpertExchange.pages.home')
      .directive('suggest', suggest);

  /** @ngInject */
  function suggest() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/home/suggest/suggest.html',
      controller: 'suggestCtrl'
    };
  }

})();