(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.goods')
    .controller('goodsCtrl', goodsCtrl);
    goodsCtrl.$inject = ['$scope','$location','$window','$timeout','$stateParams','goodService'];
    /* @ngInject */
    function goodsCtrl($scope,$location,$window,$timeout,$stateParams,goodService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;
        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/"+category_slug+"/"+good_slug;

        vm.items = {}; 

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
                console.log($scope.item);
             }, function () {
                console.log('Something wrong when get good');
             });
        }

        $scope.rating =  function() {
            console.log("rating");
            console.log($scope.item.seller.avgRating);
            $scope.ratingClick = 1;
            $timeout(function() {
                $scope.ratingClick = 0;
            },2000)

        }

        $scope.exchange =  function() {
            alert("ExpertExchange");
        }

        $scope.sellerProfile = function() {
            // var email = $scope.item.seller.id || null;
            // console.log(email);
            $window.location.href = '/#/profile';
        }
    }
})();