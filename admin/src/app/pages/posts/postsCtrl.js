(function() {
  'use strict';
  angular
  .module('BlurAdmin.pages.posts')
  .controller('postsCtrl', postsCtrl);
  postsCtrl.$inject = ['$scope', '$timeout', '$location', 'getPostsService', '$uibModal','DOMAIN_URL'];
  /* @ngInject */
  function postsCtrl($scope, $timeout, $location, getPostsService, $uibModal, DOMAIN_URL) {
    $scope.items;
    $scope.currentItem;
    initController();

    function initController() {
      var key = $location.path('/posts');
      getSearchData(key.searchString);
    }

    function getSearchData() {
     getPostsService.searchGoods().then(function (response) {
       $scope.items = response.data;
       // console.log(response);
     }, function () {
      console.log('Something wrong');
    });
   }

   function getGood(url) {
    getPostsService.getGoodsDetail(url).then(function (response) {
      $scope.currentItem=response.data;
      // console.log($scope.currentItem);
    }, function () {
      console.log('Something wrong when get good');
    });
  }

  $scope.open = function (page, size, item) {
    $scope.currentItem = item;
    var good_slug = $scope.currentItem.slug;
    var category_slug = $scope.currentItem.category.slug;
    var url = "/"+category_slug+"/"+good_slug;
    getPostsService.getGoodsDetail(url).then(function (response) {
      $scope.currentItem=response.data;
      $uibModal.open({
      animation: true,
      scope: $scope,
      templateUrl: page,
      size: size,
      resolve: {
        items: function () {
          console.log($scope.currentItem.images[0].url);
        }
      }
    });
    }, function () {
      console.log('Something wrong when get good');
    });

    // console.log($scope.currentItem.category.slug);
    // console.log($scope.currentItem.slug);
  } 
}
})();