(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('goodService', goodService);
    goodService.$inject = ['$http','DOMAIN_URL'];
    /* @ngInject */
    function goodService($http, DOMAIN_URL) {
        this.getGood = function (url) {
            return $http.get(DOMAIN_URL + "/api/goods" + url);
        };


    }
})();