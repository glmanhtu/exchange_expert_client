(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.search')
        .controller('searchCtrl', searchCtrl);
    searchCtrl.$inject = ['$scope', '$rootScope', '$location','searchService', 'PagerService', 'DOMAIN_URL'];
    /* @ngInject */
    function searchCtrl($scope, $rootScope, $location, searchService, PagerService, DOMAIN_URL) {
        var vm = this;
        vm.title = 'searchCtrl';
        vm.dummyItems = []; // dummy array of items to be paged
        vm.pager = {};
        vm.setPage = setPage;
        vm.itemPerPage = 10;

        $scope.DOMAIN_URL = DOMAIN_URL;
        $scope.allPosts = {};
        $scope.idPosts = {};
        $scope.currentPosts = {};

        initController();

        $rootScope.$watch('predicates', function (newValue, oldValue) {
            $scope.searchNull = false;
            vm.dummyItems = [];
            vm.pager = {};
            initController();
        });

        function initController() {
            if($rootScope.predicates){
                vm.setPage(1);
            }
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
            searchService.searchGoods($rootScope.predicates.title, page - 1, vm.itemPerPage).then(function (response) {
                vm.dummyItems = response.data;
                vm.pager = PagerService.GetPager(vm.dummyItems.totalElements, page, vm.itemPerPage);  
                vm.items = vm.dummyItems.content;
                if (vm.dummyItems.content && vm.dummyItems.content.length == 0) {
                    $scope.searchNull = true;
                } else {
                    $scope.searchNull = false;
                }
            }, function () {
                console.log('Something wrong');
            });                   
        }
    }
})();