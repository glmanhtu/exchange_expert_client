(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.managepost')
        .controller('managepostCtrl', managepostCtrl);

    managepostCtrl.$inject = ['$http', '$scope', '$rootScope', 'postService','PagerService','DOMAIN_URL'];

    /* @ngInject */
    function managepostCtrl($http, $scope, $rootScope, postService, PagerService, DOMAIN_URL) {
        var vm = this;
        vm.title = 'homeCtrl';
        vm.dummyItems = []; // dummy array of items to be paged

        vm.pager = {};
        vm.setPage = setPage;        
        vm.itemPerPage = 10;
        $scope.DOMAIN_URL = DOMAIN_URL;
        $scope.allPosts = {};
        $scope.idPosts = {};
        $scope.currentPosts = {};
        setPage(1);

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            var userEmail = $rootScope.userProfile.id;


            postService.getPost(userEmail).then(function (response) {
                
                vm.dummyItems = response;

                
                // get pager object from service
                vm.pager = PagerService.GetPager(vm.dummyItems.totalElements, page, vm.itemPerPage);

                // get current page of items
                vm.items = vm.dummyItems.content;
                // console.log(vm.items);
            }, function (error) {
                console.log('error in managepost controller');
                console.log(error);
            });        
        }

        function getUser(email) {
            goodService.getUser(email).then(function (response) {
            vm.dummyItems = response.data;  
         }, function () {
            // alert('Something wrong');
         });
        }
    }
})();