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

        function getGoods(key) {
            var parameter = {
                             "pagination": {
                               "currentPage": 0,
                               "itemsPerPage": 10
                             },
                             "title": 'AAA',
                             "order": {
                               "by": "title",
                               "isASC": false
                             }
                            };

            console.log(parameter);

            var url = DOMAIN_URL + '/api/search/good';
            var config = 'application/json;charset=UTF-8';

            // var req = {
            //     method: 'POST',
            //     url: url,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     data: parameter
            // }

            // $timeout( function(){
            //     $http(req).success(function(response){
            //         console.log(response);
            //     }).error(function(response){
            //         console.log(response);
            //     });

            // }, 1000 );

            var data = $.param({
                pagination: {
                    currentPage: 0,
                    itemsPerPage: 10
                },
                title: 'AAA',
                order: {
                    by: 'title',
                    isASC: false
                }
            });

            // $http.post(url, postObject).success(function(data){
            //     //Callback function here.
            //     //"data" is the response from the server.
            //     console.log(data);
            // });

            // $http.post(url, JSON.stringify(parameter), {headers: {'Content-Type': 'application/json'}}).then(function (response) {
            //     // This function handles success
            //     console.log(response);
            // }, function (response) {
            //     // this function handles error
            //     console.log(response);
            // });

            $http({
                url: url,
                method: "POST",
                data: JSON.stringify({
                    pagination: {
                        currentPage: 0,
                        itemsPerPage: 10
                    },
                    title: 'est',
                    order: {
                        by: 'title',
                        isASC: false
                    }     
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                    // success
                    console.log('success');
                    console.log(response);
            }, 
            function(response) { // optional
                    // failed
                    console.log('failed');
            });

        }

    }
})();