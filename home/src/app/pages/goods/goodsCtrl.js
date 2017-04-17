(function () {
    'use strict';
    angular
        .module('ExpertExchange.pages.goods')
        .controller('goodsCtrl', goodsCtrl);

    goodsCtrl.$inject = ['$scope', '$stateParams', 'goodService', 'DOMAIN_URL', 'googleMapService', 'InboxService', 'toastr'];

    /* @ngInject */
    function goodsCtrl($scope, $stateParams, goodService, DOMAIN_URL, googleMapService, InboxService, toastr) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;
        $scope.user = (sessionStorage.userProfile != null) ? JSON.parse(sessionStorage.userProfile) : null;
        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        $scope.address = '';
        $scope.addresses = {};
        $scope.message = {};
        $scope.DOMAIN_URL = DOMAIN_URL;
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/" + category_slug + "/" + good_slug;

        vm.items = {};
        vm.getGood(url);

        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.item = response.data;
                console.log($scope.item);
                $scope.images = response.data.images;
                googleMapService.getAddress(response.data.location[0].lat, response.data.location[0].lon).then(function (response) {
                    $scope.addreses = response.data.results[0].address_components[0].short_name;
                    $scope.addresses = response.data.results;

                }, function (error) {
                    console.log(error);
                })
            }, function () {
                console.log('Something wrong when get good');
            });
        }

        $scope.sendMessage = function () {
            console.log($scope.user.id);
            var fromUser = $scope.user.id;
            var title = "Have a message from your post: " + $scope.item.title;
            title += " from " + fromUser;
            var location = "<br/><p><b>Location:</b></p>";
            location += "<ul class='listWithTypeListOrder'>";

            $('input:checkbox[name="location"]:checked').each(function () {
                console.log($(this).val());
                location += "<li>" + $(this).val() + "</li>"
            })
            location += "</ul>";
            location += "<br/><p>From: <a href='#/profile/" + fromUser + "'><b>" + fromUser + "</b></a></p>";
            $scope.message.title = title;
            $scope.message.content += location;
            $scope.message.content += "<p><a href='#/goods" + url + "'>Link to goods</a></p>";
            $scope.message.forUser = $scope.item.seller.id;
            InboxService.SendMailPost($scope.message).then(function (response) {
                toastr.success("Your message has been sent. Thank you to you message.");
                $('#contactSeller').modal('hide');
                $scope.message = {};
            }, function (error) {
                toastr.error(error);
            })


        }

        $scope.rating = function () {
            console.log("rating");
            console.log($scope.item.seller.avgRating);
            $scope.ratingClick = 1;
            $timeout(function () {
                $scope.ratingClick = 0;
            }, 2000)

        }

        $scope.modelSendMessage = function () {
            if ($scope.user == null) {
                toastr.error("Please, login before send message to owner this goods");
            } else if ($scope.user.id == $scope.item.seller.id) {
                toastr.warning("Your cannot send message to this your");
            } else
                $('#contactSeller').modal('show');
        }
    }
})();