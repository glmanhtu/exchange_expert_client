(function () {
    'use strict';
    angular
        .module('ExpertExchange', [
        	'ngCookies',
            'ngMap',
            'textAngular',
            'ui.router',           
            'ExpertExchange.pages',                 
            'ExpertExchange.theme',
            'angular-input-stars'          
        ])
        .run(['$cookieStore', '$http', function($cookieStore, $http) {
        	if($cookieStore.get('global') != null){
        		$http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookieStore.get('global').access_token;
        	}
        }]);
})();
