(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('createGoodService', createGoodService);
        createGoodService.$inject = ['$http','DOMAIN_URL'];
        /* @ngInject */
        function createGoodService($http, DOMAIN_URL) {

            this.createNewGood = function (dataOfGood) {
                console.log(dataOfGood);
                var url = DOMAIN_URL + '/api/goods';
                return $http({
                    url: url,
                    method: "POST",
                    data: JSON.stringify(dataOfGood),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                function (response) {
                    console.log(response);
                }, function (error) {
                    console.log('Something wrong ' + error);
                });
            };

            this.uploadImage = function (file) {
                var url = DOMAIN_URL + '/api/resource/upload';
                var fd = new FormData();
                fd.append('files', file);

                return $http.post(url, fd, {
                    // transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(
                function (response) {
                    return response.data[0];
                }, function (error) {
                    console.log('Something wrong ' + error);
                });

            // var url = DOMAIN_URL + '/api/resource/upload';
            //     return $http({
            //         url: url,
            //         method: "POST",
            //         data: formdata,
            //         headers: {
            //             'Content-Type': undefined
            //         }
            //     }).then(
            //     function (response) {
            //         console.log(response.data);
            //     }, function (error) {
            //         console.log('Something wrong ' + error);
            //     });
        }
    }
})();