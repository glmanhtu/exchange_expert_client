(function () {
  'use strict';

  angular.module('ExpertExchange.pages.profile')
      .directive('inbox', inbox)
      .directive('inboxDetail', inboxDetail);

  /** @ngInject */
  function inbox() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/profile/inbox/inbox.html'
    };
  }
    /** @ngInject */
    function inboxDetail() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/profile/inbox/detail.html'
        };
    }

})();