(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.map')
        .controller('mapCtrl', mapCtrl);
    mapCtrl.$inject = ['$scope', '$rootScope', '$location','searchService', 'DOMAIN_URL', 'NgMap', 'GOOGLE_MAP_KEY'];
    /* @ngInject */
    function mapCtrl($scope, $rootScope, $location, searchService, DOMAIN_URL, NgMap, GOOGLE_MAP_KEY) {
        $scope.distance = 10000;
        $scope.items = [];
        $rootScope.mapPage = true;

        if (!$rootScope.expectedLocation) {
            $rootScope.expectedLocation = {lat: 10.772091, lng: 106.697266};            
        }

        $scope.changeLocation = function(distance) {
            searchService.searchGoodsByLocation($rootScope.expectedLocation.lat, $rootScope.expectedLocation.lng, distance).then(function(response) {
                $scope.items = response.data.content;                    
            }, function() {

            });
        }
        console.log($rootScope.expectedLocation);
        $scope.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY;
        $scope.changeLocation($scope.distance);        

        $scope.changeLocation($scope.distance);

        function getCurrentLocation() {
            toastr.info('Detecting your location');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(location) {
                    $rootScope.expectedLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
                    toastr.success('Found your location');
                    console.log($rootScope.expectedLocation);
                });
            } else {
                toastr.error('This browser not support to get your location');
            }
        }
    }
})();