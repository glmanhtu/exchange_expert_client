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
            console.log(pos);

            $rootScope.searchString = '';
            $rootScope.selectedLocation = 'all';

            getSearchByLocationData(pos,100000);

            $timeout( function(){
               vm.setPage(1);
            }, 1000 );

        }

        function initController() {
            var key = $location.path('/search').search();

            getSearchData(key.searchString,key.location);
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
        function getSearchData(key,location) {
             searchService.searchGoods(key,location).then(function (response) {
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