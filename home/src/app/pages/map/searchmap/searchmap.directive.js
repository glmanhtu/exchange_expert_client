(function () {
  'use strict';

  angular.module('ExpertExchange.theme.components')
      .directive('searchmap', searchmap);

  /** @ngInject */
  function searchmap() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/map/searchmap/searchmap.html',
      controller: 'searchmapCtrl'
    };
  }

})();