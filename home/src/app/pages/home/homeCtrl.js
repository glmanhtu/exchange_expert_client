(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.home')
    .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$http', '$timeout', '$scope','goodService','PagerService'];
    /* @ngInject */
    function homeCtrl($http, $timeout, $scope, goodService, PagerService) {
        var vm = this;
        vm.title = 'homeCtrl';
        vm.dummyItems = _.range(1, 15); // dummy array of items to be paged
        // vm.dummyItems = {};

        vm.pager = {};
        vm.setPage = setPage;
        vm.getAllItems = getAllItems;

        $scope.allPosts={};
        $scope.idPosts={};
        $scope.currentPosts = {};
        
        initController();

        function initController() {
            getAllData();
            // getDataId(1);
            getAllItems();
            // vm.dummyItems = $http.get('/assets/db/goods/db.json');
            console.log(vm.dummyItems);
            // initialize to page 1
            //10 seconds delay
            $timeout( function(){
                vm.setPage(1);
            }, 1000 );
            
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
            // get pager object from service
            // console.log(vm.dummyItems);
            vm.pager = PagerService.GetPager(vm.dummyItems.length, page);

            // get current page of items
            console.log(vm.dummyItems);
            vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            console.log(vm.items);
        }

        ////////////////
        function getAllData() {
            goodService.getData().then(function (response) {
            $scope.allPosts = response.data;
         }, function () {
             alert('Something wrong');
         });
        }

        function getDataId(id) {
            goodService.getDataById(id).then(function (response) {
            $scope.idPosts = response.data;
         }, function () {
             alert('Something wrong');
         });
        }

        ////////////////
        function getAllItems() {
            goodService.getData().then(function (response) {
            console.log(response);
            vm.dummyItems = response.data;  
         }, function () {
             alert('Something wrong');
         });
        }

    }
})();