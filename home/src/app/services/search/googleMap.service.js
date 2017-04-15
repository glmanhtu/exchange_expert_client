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
        return services;        

        function initGoogleAutoComplete() {     
            var deferred = $q.defer();

            NgMap.getMap().then(function(map) {                
                $rootScope.googlePlace = new google.maps.places.PlacesService(map);                
            });
        }

        function searchPlace(keyword) {            
            var deferred = $q.defer();
            NgMap.getMap().then(function(map) {
                var gLocation = new google.maps.LatLng(location.lat, location.lng);
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
    }
})();