(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.goods')
    .controller('goodsCtrl', goodsCtrl);
    goodsCtrl.$inject = ['$scope','goodService'];
    /* @ngInject */
    function goodsCtrl($scope, goodService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        $scope.allPosts={};
        $scope.idPosts={};

        getAllData();
        getDataId(1);
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
            console.log(response.data);
            console.log($scope.idPosts);
         }, function () {
             alert('Something wrong');
         });
        }
    }
})();