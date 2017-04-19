(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.editpost')
        .controller('editpostCtrl', editpostCtrl);

    editpostCtrl.$inject = ['$scope', '$stateParams', 'goodService', 'DOMAIN_URL', 'googleMapService', 'InboxService', 'toastr','$rootScope', 'GOOGLE_MAP_KEY', 'NgMap'];

    /* @ngInject */
    function editpostCtrl($scope, $stateParams, goodService, DOMAIN_URL, googleMapService, InboxService, toastr, $rootScope, GOOGLE_MAP_KEY, NgMap) {
        var vm = this;
        vm.title = 'editpostCtrl';
        vm.getGood = getGood;

        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/" + category_slug + "/" + good_slug;

        $scope.aGood = {
            postBy: {id: $rootScope.userProfile.id}
        };
        $scope.categories = ["Book", "Movie", "Toy", "Computer", "Clothing", "Handmade", "Sport"];
        $scope.centerMap = [44.841225,-0.580036];

        $scope.listLocations = [];
        $scope.aGood.location = [];
        $scope.aGood.images = [];
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
                $scope.aGood = response.data;
                console.log($scope.aGood);
                // $scope.images = response.data.images;

                // googleMapService.getAddress(response.data.location[0].lat, response.data.location[0].lon).then(function (response) {
                //     $scope.addreses = response.data.results[0].address_components[0].short_name;
                //     $scope.addresses = response.data.results;

                // }, function (error) {
                //     console.log(error);
                // })
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
            var data = new FormData();

            for (var i = 0; i < ins; i++) {
                data.append("files", document.getElementById('myfile').files[i]);
            }

            postService.uploadImage(data).then(
                function (response) {
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
                    postService.createNewPost($scope.aGood).then(
                        function (response) {
                            toastr.success("Successful");  
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
        }
    }
})();