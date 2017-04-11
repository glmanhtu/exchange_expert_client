(function () {
  'use strict';

  	angular.module('ExpertExchange.theme.filters', [])
  		.filter('htmlToPlaintext', function() {
		    return function(text) {
		      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
		    };
		  });

})();
