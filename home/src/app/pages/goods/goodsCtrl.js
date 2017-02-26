(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.goods')
    .controller('goodsCtrl', goodsCtrl);
    goodsCtrl.$inject = ['$scope','$timeout','$stateParams','goodService'];
    /* @ngInject */
    function goodsCtrl($scope,$timeout,$stateParams,goodService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;
        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/"+category_slug+"/"+good_slug;

        vm.item = {}; 

        initController(url);

        function initController(url) {
            $timeout( function(){
                vm.getGood(url);
            }, 1000 );        
        }

        ////////////////
        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.item = response.data;
                $scope.images = response.data.images;
                console.log($scope.images);
             }, function () {
                console.log('Something wrong when get good');
             });
        }
    }
})();