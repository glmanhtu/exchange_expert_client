(function () {
    'use strict';

    angular.module('DefaultModule.theme.components')
        .controller('navigationCtrl', navigationCtrl);

    /** @ngInject */
    function navigationCtrl($scope, $location) {

        $scope.showCreateTypes = false;

        $scope.openedFolderStack = [
            {
                name: 'My Drive',
                id: 'abcd'
            },
            {
                name: 'Documents',
                id: 'asdss'
            }
        ];

        $scope.gotoFolder = function(folder) {
            //Todo: implement action when user click to go back to folder
        }

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