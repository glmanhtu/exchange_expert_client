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
    $scope.goodId;
    initController();

    function initController() {
      var key = $location.path('/posts');
      getSearchData(key.searchString);
    }

    function getSearchData(filter) {
     getPostsService.searchGoods(filter).then(function (response) {
       $scope.items = response.data;
       // console.log(response);
     }, function () {
      console.log('Something wrong');
    });
   }

   $scope.open = function (page, size, item) {
    $scope.currentItem = item;
    var good_slug = $scope.currentItem.slug;
    var category_slug = $scope.currentItem.category.slug;
    var url = "/"+category_slug+"/"+good_slug;

    getPostsService.getGoodsDetail(url).then(function (response) {
      $scope.currentItem=response.data;
      $scope.goodId=response.data.id;
      $uibModal.open({
        animation: true,
        scope: $scope,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            $scope.currentItem.featuredImage = DOMAIN_URL+'/api' + response.data.featuredImage;
            
            for (var i = 0; i < $scope.currentItem.images.length; i++) { 
              $scope.currentItem.images[i].url = DOMAIN_URL+'/api' + response.data.images[i].url;
            }

            console.log($scope.currentItem);
          }
        }
      });
    }, function () {
      console.log('Something wrong when get good');
    });
  }

  $scope.approve=function(status){
    getPostsService.getApprove($scope.goodId, status).then(function (response) {
      console.log(response);
    }, function () {
      console.log('Something wrong when approve');
    });
  }
}
})();