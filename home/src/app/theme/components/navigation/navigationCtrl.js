(function () {
    'use strict';

    angular.module('ExpertExchange.theme.components')
    .controller('navigationCtrl', navigationCtrl);
    navigationCtrl.$inject = ['$rootScope', '$scope', '$location', 'UserService'];
    /** @ngInject */
    function navigationCtrl($rootScope, $scope, $location, UserService) {

        // if(sessionStorage.getItem('userFirstName') != null){
        //     $rootScope.userProfile = {
        //         firstName: sessionStorage.getItem('userFirstName'),
        //         id: sessionStorage.getItem('userName')
        //     };
        // }

        $rootScope.avatar = "assets/img/no-photo.png";
        UserService.GetCurrentUser().then(function (response) {
            // console.log(response);
            $rootScope.avatar = response.avatar;
            console.log($rootScope.avatar);
        }, function (error) {
            console.log(error);
        })

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