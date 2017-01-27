(function () {
    'use strict';
    angular
        .module('ExpertExchange', [
            'ui.router',                            
            'ExpertExchange.theme',
            'ExpertExchange.pages'
        ])        
        .run(run);

    function run($rootScope, $location, $http) {        
    }    
})();
