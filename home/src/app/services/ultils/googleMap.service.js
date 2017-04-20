(function () {
    'use strict';

    angular
        .module('ExpertExchange')
        .factory('googleMapService', googleMapService);

    googleMapService.$inject = ['$http', 'GOOGLE_MAP_KEY'];
    function googleMapService($http, GOOGLE_MAP_KEY) {
        var service = {};
        service.getAddress = getAddress;
        return service;

        function getAddress(lat, lng) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&latlng=' + lat + ',' + lng + '&key=' + GOOGLE_MAP_KEY;
            return $http({
                url: url,
                method: "GET",                
                headers: {
                    'Authorization': undefined
                }
            });
            return $http.get(url).then(handleSuccess, handleError('Error get location'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
