(function() {
    'use strict';
    angular
    .module('BlurAdmin')
    .factory('getPostsService', getPostsService);
    getPostsService.$inject = ['$http','$timeout','DOMAIN_URL'];
    /* @ngInject */
    function getPostsService($http, $timeout, DOMAIN_URL) {
        var service = {
            searchGoods: searchGoods,
            getGoodsDetail: getGoodsDetail
        };
        return service;
        ////////////////
        function searchGoods() {
            var url = DOMAIN_URL + '/api/admin/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"pagination":{"currentPage":0,"itemsPerPage":10},"order":{"by":"title","isASC":false}}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function getGoodsDetail(url) {
            return $http.get(DOMAIN_URL + "/api/goods" + url);
        }
    }
})();