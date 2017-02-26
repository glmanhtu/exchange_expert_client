(function () {
  'use strict';

  angular.module('ExpertExchange.pages.profile')
      .directive('information', information);

  /** @ngInject */
  function information() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/profile/information/information.html',
      controller: 'informationCtrl'
    };
  }

})();