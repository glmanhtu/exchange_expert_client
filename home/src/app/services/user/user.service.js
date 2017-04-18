(function () {
    'use strict';

    angular
        .module('ExpertExchange')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'DOMAIN_URL'];
    function UserService($http, DOMAIN_URL) {
        var service = {};

        service.GetCurrentUser = GetCurrentUser;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.GetCurrentUser = GetCurrentUser;
        service.SendFeedback = SendFeedback;
        service.Rating = Rating;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.UploadAvatar = UploadAvatar;
        service.GetDomainUrl = GetDomainUrl;
        service.ChangePassword = ChangePassword;

        return service;

        function GetCurrentUser() {
            return $http({
                url: DOMAIN_URL + '/api/user/current',
                method: "GET"
            }).then(
                function (response) {
                    return response.data;
                }, function (error) {
                    console.log('Something wrong in service user');
                    console.log(error);
                });
        }

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByEmail(email) {
            return $http.get(DOMAIN_URL + '/api/user?email=' + email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetCurrentUser() {
            return $http.get(DOMAIN_URL + '/api/user/current').then(handleSuccess, handleError('Error getting current user'))
        }

        function GetByUsername(username) {
            return $http.get('/api/user/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function SendFeedback(email, feedback) {
            var url = DOMAIN_URL + '/api/feedback?user=' + email;
            var header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify(feedback),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then(handleSuccess, handleError('Error feedback'));
        }

        function Rating(email, rate) {
            var url = DOMAIN_URL + '/api/rating?forEmailUser=' + email + '&star=' + rate;

            return $http({
                url: url,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(handleSuccess, handleError('Error rating'));
        }

        function Create(user) {
            return $http.post(DOMAIN_URL + '/api/user', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            var url = DOMAIN_URL + '/api/user/' + user.id;
            return $http({
                url: url,
                method: "PUT",
                data: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(handleSuccess, handleError('Error feedback'));
        }

        function ChangePassword(userId, password) {
            var url = DOMAIN_URL + '/api/user/change-password/' + userId;
            return $http({
                url: url,
                method: "PUT",
                data: JSON.stringify(password),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }

        function UploadAvatar(file) {
            var url = DOMAIN_URL + '/api/resource/upload';
            // var fd = new FormData();
            // fd.append('files', file);

            return $http.post(url, file, {
                // transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log('Something wrong ' + error);
                });
        }

        function Delete(id) {
            return $http.delete(DOMAIN_URL + '/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
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

        function GetDomainUrl() {
            return DOMAIN_URL;
        }
    }

})();
