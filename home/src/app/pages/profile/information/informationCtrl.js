(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $location, UserService) {
    	$scope.user_info = {};
    	GetInfo(null);

    	function GetInfo(email) {
    		var dataInfo = UserService.GetByEmail(email);
    		console.log(dataInfo);
    	}

    	$scope.rating = function () {
    		$scope.ratingClick = 1;
    		$timeout(function (argument) {
    			$scope.ratingClick = 0;
    		},5000);
    		
    		console.log("rating");
    	}

    	$scope.feedback = function (element) {
    		jQuery('#'+element).modal('show');
    	}
    }

})();