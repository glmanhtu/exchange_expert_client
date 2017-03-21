(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $location, $stateParams, UserService) {
    	var email = $stateParams.user_id;
    	$scope.user_info = {};
    	GetInfo(email);

    	function GetInfo(email) {
    		UserService.GetByEmail(email).then(function (response) {
    			$scope.user_info = response;
    			console.log($scope.user_info);
    		}, function (response) {
    			console.log(response);
    		});
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