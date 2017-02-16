(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('searchService', searchService);
    searchService.$inject = ['$http'];
    /* @ngInject */
    function searchService($http) {
        var service = {
            getData: getData
        };
        return service;
        ////////////////

        function getData() {
            // return $http.get(DOMAIN_SERVICE + '/search');
            return $http.get('/assets/db/search/db.json');
        };

    }
})();