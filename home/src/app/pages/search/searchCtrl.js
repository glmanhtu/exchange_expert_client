(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.search')
        .controller('searchCtrl', searchCtrl);
    searchCtrl.$inject = ['$scope', '$timeout', '$location','searchService', 'PagerService', 'DOMAIN_URL'];
    /* @ngInject */
    function searchCtrl($scope, $timeout, $location, searchService, PagerService, DOMAIN_URL) {
        var vm = this;
        vm.title = 'searchCtrl';
        vm.pager = {};
        vm.setPage = setPage;
        vm.getSearchData = getSearchData;
        vm.items = {}; 
        $scope.DOMAIN_URL = DOMAIN_URL;
        initController();

        function initController() {
            var key = $location.path('/search').search();

            getSearchData(key.searchString);
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
            console.log(vm.items);
        }

        ////////////////
        function getSearchData(key) {
             searchService.searchGoods(key).then(function (response) {
                vm.dummyItems = response.data;  
             }, function () {
                console.log('Something wrong');
             });
        }
    }
})();