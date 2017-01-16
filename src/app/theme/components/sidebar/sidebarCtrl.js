(function () {
    'use strict';

    angular.module('DefaultModule.theme.components')
        .controller('sidebarCtrl', sidebarCtrl);

    /** @ngInject */
    function sidebarCtrl($scope, $location) {
        $scope.drives = [
            {
                name: 'All Drives',
                icon: '',
                id: 'adrive'
            },
            {
                name: 'Google Drive',
                icon: '',
                id: 'gdrive'
            },
            {
                name: 'One Drive',
                icon: '',
                id: 'odrive'
            }
        ];
    }

})();