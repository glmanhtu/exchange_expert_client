(function() {
    'use strict';
    angular
        .module('ExpertExchange')
        .factory('localStorage', localStorage);
    localStorage.$inject = ['$window'];
    /* @ngInject */
    function localStorage($window) {
        var service = {
            localStorageServiceFactory: localStorageServiceFactory
        };
        return service;
        ////////////////
        function localStorageServiceFactory($window){
        	if($window.localStorage){
        		return $window.localStorage;
        	}
        	throw new Error('Local storage support is needed');
        }
    }
})();