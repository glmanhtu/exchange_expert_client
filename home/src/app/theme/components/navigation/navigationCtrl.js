(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('navigationCtrl', navigationCtrl);
        navigationCtrl.$inject = ['$rootScope', '$scope', '$location'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location) {
        // console.log(sessionStorage.getItem('userName'));
        $rootScope.userEmail = sessionStorage.getItem('userName');
        console.log($rootScope.userEmail);

        $scope.logout = function () {
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            $location.path('/login');
        };


    }

})();