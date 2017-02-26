(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('searchService', searchService);
    searchService.$inject = ['$http','$timeout','DOMAIN_URL'];
    /* @ngInject */
    function searchService($http, $timeout, DOMAIN_URL) {
        var service = {
            getData: getData,
            getGoods: getGoods,
            getUser: getUser,
        };
        return service;
        ////////////////

        function getData(key) {
            return $http.get('/assets/db/search/db.json');
        };

        function getUser(email) {
            var url = DOMAIN_URL + '/api/user?email=' + email;

            $http({
                url: url,
                method: "get"
            }).then(function(response) {
                    // success
                    console.log('success');
                    console.log(response);
            },function(response) { // optional
                    // failed
                    console.log('failed');
            });
        }

        this.getData = function () {
            // return $http.get(DOMAIN_SERVICE + '/goods');
            return $http.get('/assets/db/goods/db.json');
        };

        function getGoods(key) {
            var url = DOMAIN_URL + '/api/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({
                    pagination: {
                        currentPage: 0,
                        itemsPerPage: 52
                    },
                    title: key,
                    order: {
                        by: 'title',
                        isASC: false
                    }     
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        }

    }
})();