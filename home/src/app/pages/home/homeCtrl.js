(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.home')
    .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope','goodService'];
    /* @ngInject */
    function homeCtrl($scope, goodService) {
        var vm = this;
        vm.title = 'homeCtrl';
        $scope.allPosts={};
        $scope.idPosts={};

        getAllData();
        // getDataId(1);
        
        ////////////////
        function getAllData() {
            goodService.getData().then(function (response) {
            $scope.allPosts = response.data;

         }, function () {
             alert('Something wrong');
         });
        }

        function getDataId(id) {
            goodService.getDataById(id).then(function (response) {
            $scope.idPosts = response.data;
         }, function () {
             alert('Something wrong');
         });
        }

    }
})();