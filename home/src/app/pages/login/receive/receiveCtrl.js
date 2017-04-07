(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.login.receive')
        .controller('receiveCtrl', receiveCtrl);

    receiveCtrl.$inject = ['$stateParams'];

    /* @ngInject */
    function receiveCtrl($stateParams) {
    	console.log('a');
        console.log($stateParams);
    }
})();