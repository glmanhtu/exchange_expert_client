(function () {
    'use strict';
    angular
        .module('ExpertExchange.pages.goods')
        .controller('goodsCtrl', goodsCtrl);

    goodsCtrl.$inject = ['$scope', '$stateParams', 'goodService', 'DOMAIN_URL', 'googleMap', 'InboxService', 'toastr','$rootScope','$cookies'];

    /* @ngInject */
    function goodsCtrl($scope, $stateParams, goodService, DOMAIN_URL, googleMap, InboxService, toastr, $rootScope, $cookies) {
        var vm = this;
        vm.title = 'goodsCtrl';
        vm.getGood = getGood;
        $scope.user = $rootScope.userProfile;
        $scope.item = {};
        $scope.images = {};
        $scope.path = 0;
        $scope.address = '';
        $scope.addresses = [];
        $scope.message = {};
        $scope.DOMAIN_URL = DOMAIN_URL;        
        var good_slug = $stateParams.good_slug;
        var category_slug = $stateParams.category_slug;
        var url = "/" + category_slug + "/" + good_slug;

        vm.items = {};
        vm.getGood(url);

        function fillAddress(location) {
            googleMap.getAddress(location.lat, location.lon).then(function (addr) {
                if (addr.data.results.length > 0) {
                    $scope.addresses.push(addr.data.results[0].formatted_address);
                } else {
                    console.log("Can't find location of ", location);
                }
            }, function (error) {
                console.log(error);
            })
        }

        function getGood(url) {
            goodService.getGood(url).then(function (response) {
                $scope.item = response.data;
                $scope.images = response.data.images;
                for (var i = 0; i < response.data.location.length; i++) {                    
                    fillAddress(response.data.location[i]);
                }

                googleMap.getAddress(response.data.location[0].lat, response.data.location[0].lon).then(function (addr) {  
                    if (addr.data.results.length > 0) {                        
                        $scope.address = addr.data.results[0].formatted_address;                    
                    } else {
                        console.log("Can't find location of ", response.data.location[0]);
                    }
                }, function (error) {
                    console.log(error);
                });
                var read = {
                        "category":response.data.category.name,
                        "price": {"from": response.data.price - 100, "to": response.data.price + 200}}
                $cookies.putObject("read", read);


            }, function () {
                console.log('Something wrong when get good');
            });
        }

        $scope.sendMessage = function () {
            console.log($scope.user.id);
            var fromUser = $rootScope.userProfile.id;
            var title = "Have a message from your post: " + $scope.item.title;
            title += " from " + fromUser;
            var location = "<br/><p><b>Location:</b></p>";
            location += "<ul class='listWithTypeListOrder'>";

            $('input:checkbox[name="location"]:checked').each(function () {
                location += "<li>" + $(this).val() + "</li>"
            })
            location += "</ul>";
            location += "<br/><p>From: <a href='#/profile/" + fromUser + "'><b>" + fromUser + "</b></a></p>";
            $scope.message.title = title;
            $scope.message.content += location;
            $scope.message.content += "<p><a href='#/goods" + url + "'>Link to goods</a></p>";
            $scope.message.forUser = $scope.item.seller.id;
            InboxService.SendMailPost($scope.message).then(function (response) {
                toastr.success("Your message has been sent. Thank you!");
                $('#contactSeller').modal('hide');
                $scope.message = {};
            }, function (error) {
                toastr.error(error);
            })


        }

        $scope.modelSendMessage = function () {
            if ($rootScope.userProfile == null) {
                toastr.error("Please, login before send message to owner this goods");
            } else if ($rootScope.userProfile.id == $scope.item.seller.id) {
                toastr.warning("Your cannot send message to this your");
            } else
                $('#contactSeller').modal('show');
        }
    }
})();