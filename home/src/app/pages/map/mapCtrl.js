(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.map')
        .controller('mapCtrl', mapCtrl);
    mapCtrl.$inject = ['$scope', '$rootScope', '$location','searchService', 'DOMAIN_URL', 'googleMap', 'GOOGLE_MAP_KEY', 'toastr', '$q'];
    /* @ngInject */
    function mapCtrl($scope, $rootScope, $location, searchService, DOMAIN_URL, googleMap, GOOGLE_MAP_KEY, toastr, $q) {        
        $scope.items = [];
        $rootScope.mapPage = true;           

        if (sessionStorage.currentUserLocation) {
            $rootScope.expectedLocation = JSON.parse(sessionStorage.currentUserLocation);            
        } else {
            $rootScope.expectedLocation = {lat: 10.772091, lng: 106.697266};
        }

        $scope.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY;

        $scope.moveMap = function(location) {    
            $scope.closeSuggest();        
            $rootScope.expectedLocation = {lat: location.lat(), lng: location.lng()};
        }

        $scope.moveMapOnServer = function(location) {
            $scope.closeSuggest();
            var currentUserLocation = $scope.lastSelectedLocation;
            googleMap.showPath(currentUserLocation.lat, currentUserLocation.lng, location.lat, location.lon);

            //$rootScope.expectedLocation = {lat: location.lat, lng: location.lon};
        }    

        $scope.getCurrentLocation = function() {            
            var deferred = $q.defer();
            if (sessionStorage.currentUserLocation) {                
                deferred.resolve(JSON.parse(sessionStorage.currentUserLocation));
            } else if (navigator.geolocation) {
                toastr.info('Detecting your location');
                navigator.geolocation.getCurrentPosition(function(location) {
                    $rootScope.$apply(function() {
                        $rootScope.expectedLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
                        sessionStorage.setItem('currentUserLocation', JSON.stringify($rootScope.expectedLocation));
                        deferred.resolve($rootScope.expectedLocation);
                    });                    
                });                
            } else {
                deferred.reject('This browser not support to get your location');
            }
            return deferred.promise;
        }        
    }
})();