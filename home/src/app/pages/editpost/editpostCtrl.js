(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.editpost')
        .controller('editpostCtrl', editpostCtrl);

    editpostCtrl.$inject = ['$scope', '$stateParams', '$location', 'goodService', 'googleMap', 'toastr', 'GOOGLE_MAP_KEY', 'NgMap', 'postService'];

    /* @ngInject */
    function editpostCtrl($scope, $stateParams, $location, goodService, googleMap, toastr, GOOGLE_MAP_KEY, NgMap, postService) {
        var vm = this;
        vm.title = 'editpostCtrl';
        vm.getGood = getGood;

        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/" + category_slug + "/" + good_slug;

        // $scope.aGood = {
        //     postBy: {id: $rootScope.userProfile.id}
        // };
        $scope.categories = ["Book", "Movie", "Toy", "Computer", "Clothing", "Handmade", "Sport"];
        $scope.centerMap = [44.841225,-0.580036];

        $scope.listLocations = [];
        // $scope.aGood.location = [];
        // $scope.aGood.images = [];
        $scope.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY;
        NgMap.getMap().then(function(map) {
            // console.log('map', map);
            $scope.map = map;
            // var input = document.getElementById('autocomplete-input');
            // $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        });

        vm.getGood(url);

        ////////////////

        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.aGood = {
                    id: response.data.id,
                    title: response.data.title,
                    slug: response.data.slug,
                    description: response.data.description,
                    category: response.data.category,
                    price: response.data.price,
                    postBy: response.data.seller,
                    postDate: response.data.price,
                    location: response.data.location,
                    featuredImage: response.data.featuredImage,
                    images: response.data.images,
                    contacts: response.data.contacts
                };

                for (var i = 0; i < response.data.location.length; i++) {
                    googleMap.getAddress(response.data.location[i].lat, response.data.location[i].lon).then(function (response) {
                        $scope.listLocations.push({
                            nameStreet: response.data.results[0].formatted_address,
                            lat: response.data.results[0].geometry.location.lat,
                            lon: response.data.results[0].geometry.location.lon
                        });
                    }, function (error) {
                        console.log(error);
                    })
                };
                
            }, function () {
                console.log('Something wrong when get good');
            });
        }

        $scope.placeMarker = function(){
            var loc = this.getPlace().geometry.location;
            $scope.latlng = [loc.lat(), loc.lng()];
            $scope.centerMap = [loc.lat(), loc.lng()];

            $scope.address = {
                nameStreet: this.getPlace().formatted_address,
                lat: loc.lat(),
                lon: loc.lng()
            };
            // $scope.map.showInfoWindow('myInfoWindow', this);
        };

        // event click on the map add to listLocations
        $scope.getpos = function(event){
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            // $scope.centerMap = [pos.lat, pos.lon];

            // $scope.listLocations.push(pos);
            // console.log($scope.latlng);
        };

        $scope.addLocation = function(){
            if($scope.latlng != null){
                $scope.address.lat = $scope.latlng[0];
                $scope.address.lon = $scope.latlng[1];

                // console.log($scope.address);
                $scope.listLocations.push($scope.address);
                // console.log($scope.listLocations);
                $scope.searchAutoComplete = '';
                $scope.latlng = null;
            }
        }

        $scope.removeLocation = function(location){
            $scope.listLocations.splice($scope.listLocations.indexOf(location), 1);
            // $scope.listLocations.remove(location);
        }

        $scope.chooseMarker = function(location){
            $scope.latlng = [location.lat, location.lon];
            $scope.centerMap = [location.lat, location.lon];
        }

        $scope.showSelectFile = function () {
            $('#myfile').click();
        }

        $scope.setFileNameToTempFileInput = function () {
            $('#tempFile').val($('#myfile').val());
        }

        $scope.editGood = function(){
            $scope.aGood.location = [];
            // edit suitable list locations
            for (var i = 0; i < $scope.listLocations.length; i++) {
                var position = {
                    lat: $scope.listLocations[i].lat,
                    lon: $scope.listLocations[i].lon
                };
                $scope.aGood.location.push(position);
            }

            // upload multi image
            var ins = document.getElementById('myfile').files.length;

            if(ins>0){
                var data = new FormData();
                for (var i = 0; i < ins; i++) {
                    data.append("files", document.getElementById('myfile').files[i]);
                }

                postService.uploadImage(data).then(
                    function (response) {
                        $scope.aGood.images = [];
                        console.log(response);
                        // $scope.aGood.images = response;
                        $scope.aGood.featuredImage = response[0];
                        for (var i = 0; i < response.length; i++) {
                            var img = {
                                url: response[i]
                            };
                            $scope.aGood.images.push(img);
                        }

                        // console.log($scope.addGood);
                        //call service to create a new post after upload the Image
                        postService.editPost($scope.aGood, $scope.aGood.id).then(
                            function (response) {
                                toastr.success("Edit successful");
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

            }else{
                postService.editPost($scope.aGood, $scope.aGood.id).then(
                    function (response) {
                        toastr.success("Edit successful");
                        $location.path('/home');
                        // console.log(response);
                    }, function (error) {
                        console.log('Something wrong in controller create new good');
                        console.log(error);
                    });
            }

            
        }
    }
})();