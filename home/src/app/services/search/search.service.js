(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('searchService', searchService);
    searchService.$inject = ['$http','$timeout','$rootScope','DOMAIN_URL'];
    /* @ngInject */
    function searchService($http, $timeout, $rootScope, DOMAIN_URL) {
        var service = {
            getGoods: getGoods,
            getUser: getUser,
            searchGoods: searchGoods,
            searchGoodsByKeyword: searchGoodsByKeyword,
            searchGoodsByLocation: searchGoodsByLocation,
            predicateSearch: predicateSearch
        };
        return service;
      
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
        function getGoods(page, itemsPerPage) {
            var url = DOMAIN_URL + '/api/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"pagination":{"currentPage":page,"itemsPerPage":itemsPerPage},"order":{"by":"postDate","isASC":false}}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function searchGoodsByKeyword(key) {
            var url = DOMAIN_URL + '/api/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({
                    "pagination": {
                        "currentPage" : 0,
                        "itemsPerPage":10
                    }, 
                    "title" : key,
                    "order" : {
                        "by" : "title",
                        "isASC":false
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function predicateSearch(predicates) {
            var url = DOMAIN_URL + '/api/search/good';
            predicates['pagination'] = {
                "currentPage": 0,
                "itemsPerPage": 10
            };
            if (!("order" in predicates)) {
                predicates['order'] = {
                    "by" : "postDate",
                    "isASC" : false
                }
            }
            console.log(predicates);
            console.log("json: " + JSON.stringify(predicates));
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify(predicates),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function searchGoods(key, page, itemsPerPage) {
            var url = DOMAIN_URL + '/api/search/good';
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"pagination":{"currentPage":page,"itemsPerPage":itemsPerPage},"title":key,"order":{"by":"title","isASC":false}}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        function searchGoodsByLocation(lat, lng, distance) {
            var url = DOMAIN_URL + '/api/search/good';
            var location =  {
                              "pagination": {
                                "currentPage": 0,
                                "itemsPerPage": 10
                              },
                              "location": {
                                    "lat": lat,
                                    "lng": lng
                                },
                                "distance": distance,
                              "order": {
                                "by": "postDate",
                                "isASC": false
                              }
                            };
            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify({"pagination":{"currentPage":0,"itemsPerPage":10},"location":{"lat":lat,"lng":lng},"distance": distance,"order":{"by":"postDate","isASC":false}}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    }
})();