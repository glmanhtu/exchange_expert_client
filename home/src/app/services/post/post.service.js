(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.post')
        .service('createGoodService', createGoodService);
    createGoodService.$inject = ['$http','$q'];
    /* @ngInject */
    function createGoodService($http,$q) {

        var urlBase = 'http://192.168.33.10:8080/api/goods/create';
        var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

        this.createGood = function (dataOfGood) {
            console.log(dataOfGood);
            var request = $http({
                method: "post",
                url: urlBase,
                data: dataOfGood
            });

            return (request.then(function (response){
                return( response.data );
            },function ( error ) {
                return( $q.reject( error.data.message ) );
            }));

        };

        this.getGoods = function () {
            return $http.get(urlBase);
        };
    }
})();