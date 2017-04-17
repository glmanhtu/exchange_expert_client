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
            getGoodsDetail: getGoodsDetail,
            getApprove: getApprove,
        };
        return service;
        ////////////////
        function searchGoods(page, numbItems, statusFilter) {
            var url = DOMAIN_URL + '/api/admin/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"pagination":{"currentPage": page,"itemsPerPage": numbItems},"order":{"by":"postDate","isASC":false},"status":statusFilter}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function getGoodsDetail(url) {
            return $http.get(DOMAIN_URL + "/api/goods" + url);
        }

        function getApprove(goodId, status){
            var url = DOMAIN_URL + '/api/admin/good/status';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"goodId":goodId,"status":status}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})();