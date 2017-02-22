(function () {
    'use strict';
    angular
        .module('ExpertExchange.pages.goods')
        .controller('goodsCtrl', goodsCtrl);
    goodsCtrl.$inject = ['$scope', 'goodService'];
    /* @ngInject */
    function goodsCtrl($scope, goodService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        $scope.getDetail={};
        $scope.getUser={};
        $scope.getComment={};

        setController(1)
        getComment()
        ////////////////
        function setController(id) {
            getInfo(id);
            getUser(id);
        }
        ////////////////
        function getInfo(id) {
            goodService.getGoodsInfo(id).then(function (response) {
                $scope.getDetail = response.data;
            }, function () {
                alert('Can not get detail information');
            });
        }

        function getUser(id) {
            goodService.getGoodsUser(id).then(function (response) {
                $scope.getUser = response.data;
            }, function () {
                alert('Can not get user information');
            });
        }

        function getComment() {
            goodService.getGoodsUser().then(function (response) {
                $scope.getComment = response.data;
            }, function () {
                alert('Can not get comments');
            });
        }
    }
})();