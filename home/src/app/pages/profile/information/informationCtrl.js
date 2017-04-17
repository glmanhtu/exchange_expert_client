(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $window, $location, $stateParams, UserService, toastr) {
        $scope.feedback = {};
        $scope.email = $stateParams.user_id;
        $scope.user = (sessionStorage.userProfile != null ) ? JSON.parse(sessionStorage.userProfile) : null;
        $scope.user_info = {};
        $scope.rating = 3;
        $scope.listRate = [
            {rate: "1", name: "1"},
            {rate: "2", name: "2"},
            {rate: "3", name: "3"},
            {rate: "4", name: "4"},
            {rate: "5", name: "5"}
        ];

        GetInfo($scope.email);

        function GetInfo(email) {
            UserService.GetByEmail(email).then(function (response) {
                $scope.user_info = response;
            }, function (response) {
                console.log(response);
            });
        }

        $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            $dates[index].selectable = false;
        }

        $scope.selectAvatar = function () {
            if ($scope.user.id == $scope.email)
                $('#userAvatar').click();
        };

        $scope.updateProfileUser = function () {
            var outputDate = new Date($scope.user_info.birthday);
            $scope.user_info.birthday = outputDate.getTime();

            UserService.Update($scope.user_info).then(function (res) {
                toastr.success("Your profile has been updated successfully.");
            }, function (error) {
                toastr.success("Have been occurred when updated your profile. " + error);
            });
        }

        $scope.rating = function () {
            $timeout(function () {
                console.log($scope.rating);
            }, 1000);

        }

        $scope.sendFeedback = function () {
            if (confirm("Do you want to sent feedback user " + $scope.user.id)) {
                console.log($scope.feedback);
                UserService.SendFeedback($scope.email, $scope.feedback).then(function (res) {
                    toastr.success('Thank you for your feedback to ' + $scope.email);
                    setTimeout(function () {
                        $scope.reload();
                    }, 1500);
                }, function (res) {
                    toastr.error("Have been occurred sending feedback for user. Please try again.");
                });
            }
        }

        $scope.sendRating = function (index) {
            if ($scope.user != null) {
                if ($scope.user != $scope.email) {
                    var rating = index + 1;
                    UserService.Rating($scope.email, rating).then(function (res) {
                        toastr.success('Thank you for your rating to ' + $scope.email);
                        setTimeout(function () {
                            $scope.reload();
                        }, 1500);
                    }, function (res) {
                        toastr.error("Have been occurred sending rating user. Please try again.");
                    });
                }
            } else {
                toastr.error("Please, login to rating this seller");
            }

        }

        $scope.sendAvatar = function () {
            var avatar = $('#userAvatar');
            var data = new FormData();
            data.append("files", avatar[0].files[0]);

            UserService.UploadAvatar(data).then(function (res) {
                var avatarUri = '';
                $.each(res, function (index, img) {
                    avatarUri = UserService.GetDomainUrl() + '/api/' + img;
                });
                $('.profile-img').attr('src', avatarUri);
                $scope.user_info.avatar = avatarUri;
                $scope.updateProfileUser();
                toastr.success("Your avatar has been changed");
            }, function (res) {
                toastr.error("Have been occurred when changing your avatar. Please try again.");
            });
        }

        $scope.changePassword = function () {

        }

        $scope.reload = function () {
            window.location.reload();
        }

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };
    }
})();