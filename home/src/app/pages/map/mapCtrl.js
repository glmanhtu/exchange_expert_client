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

        if ($rootScope.expectedLocation && $rootScope.expectedLocation != "") {
            $scope.changeLocation = function(distance) {
                searchService.searchGoodsByLocation($rootScope.expectedLocation.lat, $rootScope.expectedLocation.lng, distance).then(function(response) {
                    $scope.items = response.data.content;                    
                }, function() {

                });
            }
            console.log($rootScope.expectedLocation);
            $scope.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY;
            $scope.changeLocation($scope.distance);
        } else {
            $location.path("/search");
        }
    }
})();