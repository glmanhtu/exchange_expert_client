/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('pageTopCtrl', pageTopCtrl);

  /** @ngInject */
  function pageTopCtrl($scope, $cookieStore, $rootScope, $location) {

      $scope.logout = function() {
        $rootScope.auth = {};
        $cookieStore.put('auth', {});
        $location.path('/login');
      }
  }
})();