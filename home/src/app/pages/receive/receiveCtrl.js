(function() {
    'use strict';

    angular
        .module('ExpertExchange.pages.receive')
        .controller('receiveCtrl', receiveCtrl);

    receiveCtrl.$inject = ['$stateParams', '$location'];

    /* @ngInject */
    function receiveCtrl($stateParams, $location) {
    	console.log('a');
        var searchObject = $location.search();
        console.log(searchObject);
    }
})();