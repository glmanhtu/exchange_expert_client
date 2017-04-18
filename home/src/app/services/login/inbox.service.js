(function () {
    'use strict';

    angular
        .module('ExpertExchange')
        .factory('InboxService', InboxService);

    InboxService.$inject = ['$http', 'DOMAIN_URL'];
    function InboxService($http, DOMAIN_URL) {
        var service = {};

        service.GetAllMailPostOfUser = GetAllMailPostOfUser;
        service.MakeAsRead = MakeAsRead;
        service.GetMailPost = GetMailPost;
        service.SendMailPost = SendMailPost;
        service.GetUnreadMailPost = GetUnreadMailPost;


        return service;


        function GetAllMailPostOfUser(currentPage) {
            return $http.get(DOMAIN_URL + '/api/mail-post?size=10&page=' + currentPage).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetMailPost(id) {
            return $http.get(DOMAIN_URL + '/api/mail-post/detail/' + id).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetUnreadMailPost() {
            return $http.get(DOMAIN_URL + '/api/mail-post/unread').then(handleSuccess, handleError('Error getting all users'));
        }

        function MakeAsRead(mailPostId) {
            var url = DOMAIN_URL + '/api/mail-post/' + mailPostId;

            return $http({
                url: url,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(handleSuccess, handleError('Error feedback'));
        }

        function SendMailPost(message) {
            var url = DOMAIN_URL + '/api/mail-post';

            return $http({
                url: url,
                method: "POST",
                data : message,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(handleSuccess, handleError('Error feedback'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }

    }

})();
