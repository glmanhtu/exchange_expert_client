(function () {
    'use strict';
    angular
        .module('DefaultModule', [            
            'ui.router',                            
            'DefaultModule.theme',
            'DefaultModule.pages'
        ])        
        .run(run);

    function run($rootScope, $location, $http) {        
    }    
})();
