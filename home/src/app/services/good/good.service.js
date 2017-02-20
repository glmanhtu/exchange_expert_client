(function () {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('goodService', goodService);
    goodService.$inject = ['$http', 'DOMAIN_SERVICE'];
    /* @ngInject */
    function goodService($http,DOMAIN_SERVICE) {
        var services = {};
        services.getGoodsInfo = getGoodsInfo;
        services.getGoodsComment = getGoodsComment;
        services.getGoodsUser = getGoodsUser;
        return services;

        function getGoodsInfo(id) {
            return $http.get(DOMAIN_SERVICE + '/goods/'+id);
        };

        function getGoodsComment() {
            return $http.get(DOMAIN_SERVICE + '/comments/');
        }

        function getGoodsUser(id) {
            return $http.get(DOMAIN_SERVICE + '/users/'+id);
        }
    }
})();