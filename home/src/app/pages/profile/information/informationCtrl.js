(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $window, $location, $stateParams, UserService) {
        $scope.feedback = {};
        $scope.email = $stateParams.user_id;
        $scope.user = JSON.parse(sessionStorage.userProfile);
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

        $scope.selectAvatar = function () {
            $('#userAvatar').click();
        };

        $scope.updateProfileUser = function () {
            UserService.Update($scope.user_info);
        }

        $scope.uploadImage = function (element) {
            $scope.accessToken = sessionStorage.accessToken;
            if ($scope.accessToken)
                jQuery('#' + element).modal('show');
            else
                $window.location.href = '/#/login';
        }

        $scope.rating = function () {
            $timeout(function () {
                console.log($scope.rating);
            }, 1000);

        }

        $scope.sendFeedback = function () {
            var accessToken = sessionStorage.accessToken;
            if (confirm("Do you want to sent feedback user " + $scope.user.id)) {
                console.log($scope.feedback);
                UserService.SendFeedback($scope.email, $scope.feedback, accessToken).then(function (res) {
                    setTimeout(function () {
                        $('#popupModel .modal-title').html('Rating response');
                        $('#popupModel .modal-body').html('<p>Thank you for your feedback to <b>' + $scope.email + '</b></p>');
                        $('#popupModel').modal('show');
                    }, 500);
                });
            }
        }
        $scope.sendRating = function (index) {

            var rating = index + 1;
            UserService.Rating($scope.email, accessToken, rating).then(function (res) {
                setTimeout(function () {
                    $('#popupModel .modal-title').html('Rating response');
                    $('#popupModel .modal-body').html('<p>Thank you for your rating to <b>' + $scope.email + '</b></p>');
                    $('#popupModel').modal('show');
                }, 500);
            });
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
            });
        }

        $scope.reload = function () {
            window.location.reload();
        }
    }
})();