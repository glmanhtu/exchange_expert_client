(function() {
    'use strict';
    angular
    .module('ExpertExchange')
    .service('postService', postService);
    postService.$inject = ['$http','DOMAIN_URL'];
    /* @ngInject */
    function postService($http, DOMAIN_URL) {

        this.createNewPost = function (dataOfGood) {
            var url = DOMAIN_URL + '/api/goods';
            console.log(JSON.stringify(dataOfGood));
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
            console.log(url);
            console.log(file);

            return $http.post(url, file, {
                // transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(
            function (response) {
                return response.data;
            }, function (error) {
                console.log('Something wrong ' + error);
            });
        }

        this.getPost = function (email) {
            var url = DOMAIN_URL + '/api/goods/user/' + email;
            return $http({
                url: url,
                method: "GET"
            }).then(
            function (response) {
                return response.data;
            }, function (error) {
                console.log('Something wrong ' + error);
            });
        }
    }
})();