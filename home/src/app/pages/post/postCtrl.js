(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.post')
    .controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', '$rootScope', '$location', 'postService', 'GOOGLE_MAP_KEY', 'NgMap'];
    /* @ngInject */
    function postCtrl($scope, $rootScope, $location, postService, GOOGLE_MAP_KEY, NgMap) {
        active();

        function active(){
            // console.log($rootScope.userProfile.id);
            // var userInfor = JSON.parse(sessionStorage.userProfile);
            
            $scope.aGood = {
                postBy: {id: $rootScope.userProfile.id}
            };
            $scope.categories = ["Book", "Movie", "Toy", "Computer", "Clothing", "Handmade", "Sport"];

            // set default position marker
            // $scope.latlng = [44.841225,-0.580036];
            $scope.centerMap = [44.841225,-0.580036];
            // $scope.address = {};

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



            // var autocomplete = new google.maps.places.Autocomplete(input);

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
            

        $scope.addGood = function(){
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
                            // $location.path('/home');
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