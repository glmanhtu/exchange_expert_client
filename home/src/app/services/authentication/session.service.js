(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .service('sessionService', sessionService);
    sessionService.$inject = ['$log', 'localStorage'];
    /* @ngInject */
    function sessionService($log, localStorage) {
        // Instantiate data when service
        // is loaded
        this._user = JSON.parse(localStorage.getItem('session.user'));
        this._accessToken = JSON.parse(localStorage.getItem('session.accessToken'));

        this.getUser = function(){
        	return this._user;
        };

        this.setUser = function(user){
        	this._user = user;
        	localStorage.setItem('session.user', JSON.stringify(user));
        	return this;
        };

        this.getAccessToken = function(){
        	return this._accessToken;
        };

        this.setAccessToken = function(token){
        	this._accessToken = token;
        	localStorage.setItem('session.accessToken', token);
        	return this;
        };

        //Destroy session
        this.destroy = function destroy(){
        	this.setUser(null);
        	this.setAccessToken(null);
        };
    }
})();