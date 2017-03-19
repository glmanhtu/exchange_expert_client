(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('navigationCtrl', navigationCtrl);
        navigationCtrl.$inject = ['$rootScope', '$scope', '$location'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location) {
        console.log(sessionStorage.getItem('userName'));
        $scope.userName = sessionStorage.getItem('userName');

        $scope.logout = function () {
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            // console.log(sessionStorage.getItem('userName'));
            $location.path('/login');
        };

        $scope.copy = function() {

        }

        $scope.cut = function() {

        }

        $scope.openSetting = function() {

        }

        $scope.toggleCreateType = function() {
            $scope.showCreateTypes = !$scope.showCreateTypes;
        }
    }

})();