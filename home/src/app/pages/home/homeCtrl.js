(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.home')
    .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$http', '$timeout', '$scope','goodService', 'searchService','PagerService','DOMAIN_URL'];
    /* @ngInject */
    function homeCtrl($http, $timeout, $scope, goodService, searchService, PagerService, DOMAIN_URL) {
        var vm = this;
        vm.title = 'homeCtrl';
        vm.dummyItems = _.range(1, 15); // dummy array of items to be paged

        vm.pager = {};
        vm.setPage = setPage;
        vm.getAllItems = getAllItems;
        $scope.DOMAIN_URL = DOMAIN_URL;
        $scope.allPosts={};
        $scope.idPosts={};
        $scope.currentPosts = {};
        
        initController();

        function initController() {
            getAllItems();
            // initialize to page 1, 10 seconds delay
            $timeout( function(){
                vm.setPage(1);
            }, 1000 );
            
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
            // get pager object from service
            vm.pager = PagerService.GetPager(vm.dummyItems.length, page);
            // get current page of items
            vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }

        function getAllItems() {
            searchService.getGoods().then(function (response) {
                vm.dummyItems = response.data;
                console.log(response.data);
            }, function () {
                // alert('Something wrong');
            });
        }

        function getUser(email) {
            goodService.getUser(email).then(function (response) {
            vm.dummyItems = response.data;  
         }, function () {
            // alert('Something wrong');
         });
        }

    }
})();