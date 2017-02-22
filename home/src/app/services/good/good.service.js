(function () {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('goodService', goodService);
    goodService.$inject = ['$http'];
    /* @ngInject */
    function goodService($http) {
        var services = {};
        services.getGoodsInfo = getGoodsInfo;
        services.getGoodsComment = getGoodsComment;
        services.getGoodsUser = getGoodsUser;
        return services;

        function getGoodsInfo(id) {
            return $http.get('http://localhost:3000/goods/'+id);
        };

        function getGoodsComment() {
            return $http.get('http://localhost:3000/comments/');
        }

        function getGoodsUser(id) {
            return $http.get('http://localhost:3000/users/'+id);
        }
    }
})();