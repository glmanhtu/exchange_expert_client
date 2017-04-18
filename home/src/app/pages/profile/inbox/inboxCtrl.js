(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('inboxCtrl', inboxCtrl);

    /** @ngInject */
    function inboxCtrl($scope, $stateParams, UserService, InboxService, toastr, $rootScope, $location) {
        $scope.mailPosts = {}
        $scope.mailPost = {}
        $scope.feedback = {};
        $scope.user = $rootScope.userProfile
        $scope.user_info = {};
        $scope.setInboxPage = setInboxPage;
        GetInfo($scope.user.id);

        if($stateParams.id == null)
            GetAllMailPostOfUser(0);
        else
            GetDetailPostMail($stateParams.id);

        function GetInfo(email) {
            UserService.GetByEmail(email).then(function (response) {
                $scope.user_info = response;
            }, function (error) {
                toastr.error(error);
            });
        }

        function GetAllMailPostOfUser(currentPage) {
            InboxService.GetAllMailPostOfUser(currentPage).then(function (response) {
                $scope.mailPosts = response;
            }, function (error) {
                toastr.error(error);
            });
        }

        function setInboxPage(page) {
            if (page < 0 || page > $scope.mailPosts.totalPages) {
                return;
            }

            GetAllMailPostOfUser(page);
        }


        $scope.postMailDetail = function (id) {
            window.location.href = "#/inbox/detail/" + $scope.email + "?id=" + id;
        };

        function GetDetailPostMail(id) {
            InboxService.GetMailPost(id).then(function (response) {
                $scope.mailPost = response;
                MakeAsRead(id);
            }, function (error) {
                toastr.error(error);
            });
        }

        function MakeAsRead(id) {
            InboxService.MakeAsRead(id);
        }

    }
})();