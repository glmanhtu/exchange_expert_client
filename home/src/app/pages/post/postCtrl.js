(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.post')
        .controller('createGoodCtrl', createGoodCtrl);
    createGoodCtrl.$inject = ['$scope', '$location', 'createGoodService'];
    /* @ngInject */
    function createGoodCtrl($scope, $location, createGoodService) {
        
        $scope.allGoods=[]; 

        $scope.aGood = {};

        $scope.addGood = function(){
            createGoodService.createGood($scope.aGood).then(function (response){
                loadAllGoods();
            },function(error) {
                alert('Something wrong: ' + error.message);
            });
            $location.path('/home');
        }

        //loadAllGoods();

        function loadAllGoods() {
            createGoodService.getGoods().then(function (response) {
                $scope.allGoods = response.data;
            }, function (error) {
                alert('Something wrong: ' + error.message);
            });
        }
    }
})();