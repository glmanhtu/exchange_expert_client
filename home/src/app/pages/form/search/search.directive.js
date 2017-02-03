(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('searchbar', searchBar);

  /** @ngInject */
  function searchBar() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/form/search/search.html',
      controller: 'searchCtrl'
    };
  }

})();