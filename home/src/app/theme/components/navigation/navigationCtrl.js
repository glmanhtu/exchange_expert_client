(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('navigationCtrl', navigationCtrl);
        navigationCtrl.$inject = ['$rootScope', '$scope', '$location'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location) {

        if(sessionStorage.getItem('userFirstName') != null){
            $rootScope.userProfile = {
                firstName: sessionStorage.getItem('userFirstName'),
                id: sessionStorage.getItem('userName')
            };
        }

        $scope.logout = function () {
            sessionStorage.removeItem('userFirstName');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            // console.log(sessionStorage.getItem('userName'));
            $location.path('/login');
        };


    }

})();