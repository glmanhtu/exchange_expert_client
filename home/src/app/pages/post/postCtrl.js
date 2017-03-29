(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.post')
    .controller('createGoodCtrl', createGoodCtrl);
    createGoodCtrl.$inject = ['$scope', '$location', 'createGoodService'];
    /* @ngInject */
    function createGoodCtrl($scope, $location, createGoodService) {
        if(sessionStorage.userName == null){
            $location.path('/login');
        }else{
            active();
        }

        function active(){
            $scope.aGood = {
                postBy: {id: sessionStorage.userName}
            };
            $scope.categories = ["Book", "Movie", "Toy", "Computer", "Clothing", "Handmade", "Sport"];

            // set default position marker
            $scope.latlng = [44.841225,-0.580036];

            $scope.aGood.images = [];
            $scope.listLocations = [];
            $scope.aGood.featuredImage = '';
        }


        // event click on the map add to listLocations
        $scope.getpos = function(event){
            var pos = {
                lat: event.latLng.lat(),
                lon: event.latLng.lng()
            };

            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            $scope.listLocations.push(pos);
            // console.log($scope.listLocations);
        };

        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        $scope.addGood = function(){
            $scope.aGood.location = $scope.listLocations;



            createGoodService.uploadImage($scope.uploadImage).then(
                function (response) {
                    var responseImage = {
                        url: '/'+response,
                        title: 'Image title',
                        alt: 'Image alt'
                    };
                    $scope.aGood.images.push(responseImage);

                    $scope.aGood.featuredImage = response;
                    console.log($scope.aGood.featuredImage);
                    // call service to create a new post after upload the Image
                    createGoodService.createNewGood($scope.aGood).then(
                        function (response) {
                            console.log('Create new good successful');
                            // console.log(response);
                        }, function (error) {
                            console.log('Something wrong in controller create new good');
                            console.log(error);
                        });

                }, function (error) {
                    console.log('Controller Something wrong ');
                    console.log(error);
                });
            
            // var ins = document.getElementById('myfile').files.length;

            // for (var i = 0; i < ins; i++) {
            //     var data = new FormData();
            //     data.append("files", document.getElementById('myfile').files[i]);

            //     createGoodService.uploadImage(data).then(
            //         function (response) {
            //             $scope.aGood.images.push(response);
            //         }, function (error) {
            //             console.log('Controller Something wrong ');
            //             console.log(error);
            //         });
            // }

            // // call service to create a new post after upload the Image
            // createGoodService.createNewGood($scope.aGood).then(
            //     function (response) {
            //         console.log('response create new good');
            //         console.log(response);
            //     }, function (error) {
            //         console.log('Something wrong in controller create new good');
            //         console.log(error);
            //     });

            $location.path('/home');
        }
    }
})();