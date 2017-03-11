(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('authService', authService);
    authService.$inject = ['$http', 'session', 'DOMAIN_URL'];
    /* @ngInject */
    function authService($http, session, DOMAIN_URL) {

        this.isLoggedIn = function () {
        	return session.getUser() !== null;
        }

        this.logIn = function(credentials){
        	return $http.post(DOMAIN_URL + '/api/oauth/token', credentials).then(
        		function(response){
        			var data = response.data;
        			session.setUser(data.user);
        			session.setAccessToken(data.accessToken);
        		});
        };

        this.logOut = function(){
        	return $http.get('/api').then(
        		function(response){
        			// Destroy session in the browser
        			session.destroy(); 
        		});
        };
        
    }
})();