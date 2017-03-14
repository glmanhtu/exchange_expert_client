(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.post')
        .controller('createGoodCtrl', createGoodCtrl);
    createGoodCtrl.$inject = ['$scope', '$location', 'createGoodService'];
    /* @ngInject */
    function createGoodCtrl($scope, $location, createGoodService) {
        $scope.categories = ["Book", "Movie", "Toy", "Computer", "Clothing", "Handmade", "Sport"];
        $scope.aGood = {
            category: {description:'Category description'},
            postBy: {id:'mathews@yahoo.com'},
            location:{lat:133,lon:233},
            featuredImage:'/avatar/abc.jpg'
            // images:[{
            //     url:'/images/aaaaaaaa.jpg',title:'book title',alt:'book title'},{
            //     url:'/images/abc.jpg',title:'book title',alt:'book title'
            // }]
        };
        $scope.aGood.images = [];

        // var formdata = new FormData();
        //     $scope.getTheFiles = function ($files) {
        //         angular.forEach($files, function (value, key) {
        //             formdata.append(key, value);
        //         });
        //     };

        $scope.addGood = function(){
            // console.log('controller call');
            var file = $scope.uploadImage;
            // console.log('file is ' );
            // console.dir(file);

            createGoodService.uploadImage(file).then(
                function (response) {
                    var responseImage = {
                        url: '/'+response,
                        title: 'Image title',
                        alt: 'Image alt'
                    };
                    $scope.aGood.images.push(responseImage);
                    // console.log($scope.aGood.images);

                    console.log($scope.aGood.images);
                    // call service to create a new post after upload the Image
                    createGoodService.createNewGood($scope.aGood).then(
                        function (response) {
                            console.log('response create new good');
                            console.log(response);
                        }, function (error) {
                            console.log('Something wrong in controller create new good');
                            console.log(error);
                        });

                }, function (error) {
                    console.log('Controller Something wrong ');
                    console.log(error);
                });



            //$location.path('/home');
        }

        //loadAllGoods();
        // function loadAllGoods() {
        //     CreateGoodService.getGoods().then(function (response) {
        //         $scope.allGoods = response.data;
        //     }, function (error) {
        //         alert('Something wrong: ' + error.message);
        //     });
        // }
    }
})();