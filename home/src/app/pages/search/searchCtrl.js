(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.search')
        .controller('searchCtrl', searchCtrl);
    searchCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$location','searchService', 'PagerService', 'DOMAIN_URL'];
    /* @ngInject */
    function searchCtrl($scope, $rootScope, $timeout, $location, searchService, PagerService, DOMAIN_URL) {
        var vm = this;
        vm.title = 'searchCtrl';
        vm.dummyItems = []; // dummy array of items to be paged
        vm.pager = {};
        vm.setPage = setPage;
        vm.getSearchData = getSearchData;
        vm.items = {};
        
        initController();

        $scope.DOMAIN_URL = DOMAIN_URL;
        $scope.listLocations = [];
        $scope.latlng = [44.841225,-0.580036];
        $scope.latlon = {"lat":44.841225,"lon":-0.580036};
        $scope.listLocations.push($scope.latlon);

        $scope.$on('handleBroadcast', function() {
            $scope.searchNull = 0;
            vm.dummyItems = [];
            vm.pager = {};
            vm.setPage = setPage;
            vm.getSearchData = getSearchData;
            vm.items = {};
            initController();
        });

        // event click on the map add to listLocations
        $scope.getpos = function(event){
            var pos = {
                lat: event.latLng.lat(),
                lon: event.latLng.lng()
            };
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            $scope.listLocations.push(pos);
        };

        $scope.searchByLocation = function() {
            var pos = {
                lat: _.last($scope.listLocations).lat,
                lon: _.last($scope.listLocations).lon
            };

            $rootScope.searchString = '';
            $rootScope.selectedLocation = 'all';

            getSearchByLocationData(pos,100000);

            $timeout( function(){
               vm.setPage(1);
            }, 1000 );
        }

        function initController() {

            if($rootScope.predicates){
                console.log('predicates: ');
                console.log($rootScope.predicates);
                getSearchPredicate($rootScope.predicates);
                $timeout( function(){
                    vm.setPage(1);
                    console.log(vm.dummyItems.content);
                    if (vm.dummyItems.content && vm.dummyItems.content.length == 0) {
                        $scope.searchNull = 1;
                    }
                    
                }, 1000 );
            } else {
                var key = $location.path('/search').search();
                getSearchData(key.searchString,key.location);
                $timeout( function(){
                    vm.setPage(1);
                    console.log(vm.dummyItems);
                    if (vm.dummyItems.content && vm.dummyItems.content.length == 0) {
                        $scope.searchNull = 1;
                    }

                }, 1000 );
            }

        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
            vm.pager = PagerService.GetPager(vm.dummyItems.totalElements, page);
            vm.items = vm.dummyItems.content.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }

        function getSearchData(key,location) {
             searchService.searchGoods(key,location).then(function (response) {
                vm.dummyItems = response.data;  
             }, function () {
                console.log('Something wrong');
             });
        }

        function getSearchPredicate(predicate) {
             searchService.predicateSearch(predicate).then(function (response) {
                vm.dummyItems = response.data;  
             }, function () {
                console.log('Something wrong');
             });
        }

        function getSearchByLocationData(pos,distance) {
            searchService.searchGoodsByLocation(pos.lat,pos.lon,distance).then(function (response) {
               vm.dummyItems = response.data;
               console.log(response);
            }, function () {
               console.log('Something wrong search');
            });
        }
    }
})();