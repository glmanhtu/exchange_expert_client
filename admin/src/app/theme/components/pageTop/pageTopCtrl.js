/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('pageTopCtrl', pageTopCtrl);

  /** @ngInject */
  function pageTopCtrl($scope, $cookieStore, $rootScope, $location, UserService, layoutPaths) {

      $scope.avatar = layoutPaths.images.profile + "no-photo.png";
      UserService.GetCurrentUser().then(function (response) {
        console.log(response);
          $scope.avatar = response.avatar;
      }, function (error) {
        console.log(error);
      })

      $scope.logout = function() {
        $rootScope.auth = {};
        $cookieStore.put('auth', {});
        $location.path('/login');
      }
  }
})();