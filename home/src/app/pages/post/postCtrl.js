(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.post')
    .controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', '$location', 'postService'];
    /* @ngInject */
    function postCtrl($scope, $location, postService) {
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

            $scope.listLocations = [];
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


        $scope.addGood = function(){
            $scope.aGood.location = $scope.listLocations;

            var ins = document.getElementById('myfile').files.length;
            var data = new FormData();

            for (var i = 0; i < ins; i++) {
                data.append("files", document.getElementById('myfile').files[i]);
            }

            postService.uploadImage(data).then(
                function (response) {
                    $scope.aGood.images = response;
                    $scope.aGood.featuredImage = response[0];

                    console.log($scope.aGood);
                    //call service to create a new post after upload the Image
                    postService.createNewPost($scope.aGood).then(
                        function (response) {
                            $location.path('/home');
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

            //     postService.uploadImage(data).then(
            //         function (response) {
            //             $scope.aGood.images.push(response);
            //         }, function (error) {
            //             console.log('Controller Something wrong ');
            //             console.log(error);
            //         });
            // }

            // // call service to create a new post after upload the Image
            // postService.createNewPost($scope.aGood).then(
            //     function (response) {
            //         console.log('response create new good');
            //         console.log(response);
            //     }, function (error) {
            //         console.log('Something wrong in controller create new good');
            //         console.log(error);
            //     });

            
        }
    }
})();