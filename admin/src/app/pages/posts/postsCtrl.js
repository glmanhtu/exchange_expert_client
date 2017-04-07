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

    function getSearchData() {
     getPostsService.searchGoods().then(function (response) {
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
      getSearchData();
      console.log(response);
    }, function () {
      console.log('Something wrong when approve');
    });
  }

  function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
}
})();