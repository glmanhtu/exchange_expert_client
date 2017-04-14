(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.goods')
    .controller('goodsCtrl', goodsCtrl);

    goodsCtrl.$inject = ['$scope','$stateParams','goodService','DOMAIN_URL', 'googleMapService'];

    /* @ngInject */
    function goodsCtrl($scope, $stateParams, goodService, DOMAIN_URL, googleMapService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;
        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        $scope.address = '';
        $scope.DOMAIN_URL = DOMAIN_URL;
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/"+category_slug+"/"+good_slug;

        vm.items = {}; 
        vm.getGood(url);
        
        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.item = response.data;
                $scope.images = response.data.images;
                googleMapService.getAddress(response.data.location[0].lat, response.data.location[0].lon).then(function(response) {
                    $scope.address = response.data.results[0].address_components[0].short_name;
                }, function(error) {
                    console.log(error);
                })
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
    }
})();