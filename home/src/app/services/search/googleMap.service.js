(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('googleMap', googleMap);
    googleMap.$inject = ['$http','$timeout','DOMAIN_URL', '$rootScope', 'NgMap', '$q'];
    /* @ngInject */
    function googleMap($http, $timeout, DOMAIN_URL, $rootScope, NgMap, $q) {
        
        var services = {};
        services.searchPlace = searchPlace;
        services.showPath = showPath;
        return services;        

        function searchPlace(keyword) {            
            var deferred = $q.defer();
            NgMap.getMap().then(function(map) {                
                var request = {                    
                    query: keyword
                };
                var googlePlace = new google.maps.places.PlacesService(map);                
                googlePlace.textSearch(request, function(results, status) {
                    deferred.resolve(results);
                });
            });            
            return deferred.promise;
        }

        function showPath(startLat, startLng, endLat, endLng) {
            NgMap.getMap().then(function(map) {
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                var startLocation = new google.maps.LatLng(startLat, startLng);
                var endLocation = new google.maps.LatLng(endLat, endLng);                
                directionsDisplay.setMap(map);
                var request = {
                    origin : startLocation,
                    destination : endLocation,
                    travelMode: 'DRIVING'
                };

                directionsService.route(request, function(response, status) {
                    if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                    }
                });
            });
        }
    }
})();