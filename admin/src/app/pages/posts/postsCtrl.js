(function() {
  'use strict';
  angular
  .module('BlurAdmin.pages.posts')
  .controller('postsCtrl', postsCtrl);
  postsCtrl.$inject = ['$scope', '$timeout', '$location', 'getPostsService', '$uibModal','DOMAIN_URL', 'PagerService'];
  /* @ngInject */
  function postsCtrl($scope, $timeout, $location, getPostsService, $uibModal, DOMAIN_URL, PagerService) {
    $scope.items;
    $scope.currentItem;   
    $scope.curentPage = 1; 
    var vm = this;
    vm.dummyItems = []; // dummy array of items to be paged

    vm.pager = {};
    vm.setPage = setPage;        
    vm.itemPerPage = 10;

    $scope.selects = [{
      id: 0,
      label: 'Waiting',
    }, {
      id: 1,
      label: 'Approve',
    }, {
      id: 2,
      label: 'Ban',
    }];    
    $scope.select = $scope.selects[0];

    $scope.getSearchData = function(statusFilter) {
        getPostsService.searchGoods(0, vm.itemPerPage, statusFilter).then(function (response) {
          $scope.items = response.data.content;
          vm.pager = PagerService.GetPager(response.data.totalElements, 0, vm.itemPerPage);
        }, function () {
          console.log('Something wrong');
        });
    }
    setPage(1);

    function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }            
        $scope.curentPage = page;
        getPostsService.searchGoods(page - 1, vm.itemPerPage, $scope.select.id).then(function (response) {
            $scope.items = response.data.content;
            
            // get pager object from service
            vm.pager = PagerService.GetPager(response.data.totalElements, page, vm.itemPerPage);
        }, function () {
            // alert('Something wrong');
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
              $scope.currentItem.featuredImage = DOMAIN_URL+'/api/' + response.data.featuredImage;

              for (var i = 0; i < $scope.currentItem.images.length; i++) { 
                $scope.currentItem.images[i].url = DOMAIN_URL+'/api/' + response.data.images[i].url;
              }          
            }
          }
        });
      }, function () {
        console.log('Something wrong when get good');
      });
    }

    $scope.approve = function(status){
      getPostsService.getApprove($scope.goodId, status).then(function (response) {
        $scope.getSearchData($scope.curentPage);        
      }, function () {
        console.log('Something wrong when approve');
      });
    }
  }
})();