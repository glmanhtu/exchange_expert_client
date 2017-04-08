(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
        .controller('navigationCtrl', navigationCtrl);
        navigationCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'loginService'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location, $http, loginService) {

        if ((sessionStorage.userFirstName) != null){
            $rootScope.userProfile = {
                firstName: sessionStorage.userFirstName,
                id: sessionStorage.userName
            };
        }

        $scope.logout = function () {
            loginService.logout();
            delete $rootScope.userProfile;
            $location.path('/login');
        };


    }

})();