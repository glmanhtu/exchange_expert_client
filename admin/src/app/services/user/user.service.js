(function () {
    'use strict';

    angular
        .module('BlurAdmin')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','DOMAIN_URL'];
    function UserService($http,DOMAIN_URL) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.SendFeedback = SendFeedback;
        service.RatingFeedback = RatingFeedback;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByEmail(email) {
            return $http.get(DOMAIN_URL + '/api/user?email=' + email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function SendFeedback(email,token,msg) {
            var url = DOMAIN_URL + '/api/feedback?user=' + email;
            var header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            var data = {
                    "message": msg
            };

            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(handleSuccess, handleError('Error feedback'));
        }

        function RatingFeedback(email,token,rate) {

            console.log(rate);

            var url = DOMAIN_URL + '/api/rating?forEmailUser=' + email + '&star=' + rate;
            var header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            };
            var data = {};

            return $http({
                url: url,
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(handleSuccess, handleError('Error rating'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
