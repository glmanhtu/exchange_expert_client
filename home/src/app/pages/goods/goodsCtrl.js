(function() {
    'use strict';
    angular
    .module('ExpertExchange.pages.goods')
    .controller('goodsCtrl', goodsCtrl);

    goodsCtrl.$inject = ['$scope','$stateParams','goodService','DOMAIN_URL', 'googleMapService'];

    /* @ngInject */
    function goodsCtrl($scope, $stateParams, goodService, DOMAIN_URL, googleMapService) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;

  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//unsplash.it/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }

        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        $scope.address = '';
        $scope.DOMAIN_URL = DOMAIN_URL;
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/"+category_slug+"/"+good_slug;

        vm.items = {}; 
        vm.getGood(url);
        
        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.item = response.data;
                $scope.images = response.data.images;
                googleMapService.getAddress(response.data.location[0].lat, response.data.location[0].lng).then(function(response) {
                    $scope.address = response.data.results[0].formatted_address;
                }, function(error) {
                    console.log(error);
                })
             }, function () {
                console.log('Something wrong when get good');
             });
        }

        $scope.rating =  function() {
            console.log("rating");
            console.log($scope.item.seller.avgRating);
            $scope.ratingClick = 1;
            $timeout(function() {
                $scope.ratingClick = 0;
            },2000)

        }
    }
})();