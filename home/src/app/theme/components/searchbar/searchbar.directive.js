(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('searchbar', searchbar);

  /** @ngInject */
  function searchbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/searchbar/searchbar.html',
      controller: 'searchbarCtrl'
    };
  }

})();