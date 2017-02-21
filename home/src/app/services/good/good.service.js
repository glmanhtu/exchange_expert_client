(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('goodService', goodService);
    goodService.$inject = ['$http','DOMAIN_SERVICE'];
    /* @ngInject */
    function goodService($http, DOMAIN_SERVICE) {
        this.getData = function () {
            // return $http.get(DOMAIN_SERVICE + '/goods');
            return $http.get('/assets/db/goods/db.json');
        };

        this.getDataById = function (id) {
            return $http.get(DOMAIN_SERVICE + '/goods/' + id);
        };

    }
})();