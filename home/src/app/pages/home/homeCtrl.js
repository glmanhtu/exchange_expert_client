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
        vm.dummyItems = []; // dummy array of items to be paged

        vm.pager = {};
        vm.setPage = setPage;        
        vm.itemPerPage = 10;
        $scope.DOMAIN_URL = DOMAIN_URL;
        $scope.allPosts = {};
        $scope.idPosts = {};
        $scope.currentPosts = {};
        setPage(1);

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }            

            searchService.getGoods(page - 1, vm.itemPerPage).then(function (response) {
                vm.dummyItems = response.data;
                
                // get pager object from service
                vm.pager = PagerService.GetPager(vm.dummyItems.totalElements, page, vm.itemPerPage);

                // get current page of items
                vm.items = vm.dummyItems.content;
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