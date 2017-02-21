(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.search')
        .controller('searchCtrl', searchCtrl);
    searchCtrl.$inject = ['$scope', '$timeout', '$location','searchService', 'PagerService'];
    /* @ngInject */
    function searchCtrl($scope, $timeout, $location, searchService, PagerService) {
        var vm = this;
        vm.title = 'searchCtrl';
        vm.pager = {};
        vm.setPage = setPage;
        vm.getAllItems = getAllItems;

        initController();

        function initController() {
            var key = $location.path('/search').search();
            getAllItems(key);

            // initialize to page 1
            // 10 seconds delay
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

        ////////////////
        function getAllItems(key) {
            searchService.getData(key).then(function (response) {
            vm.dummyItems = response.data;  
         }, function () {
             alert('Something wrong');
         });
        }
    }
})();