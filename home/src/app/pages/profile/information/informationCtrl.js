(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $location, $stateParams, UserService) {
    	$scope.email = $stateParams.user_id;
    	$scope.user = sessionStorage.userName;
    	$scope.user_info = {};
    	$scope.rating_feedback = 3;
    	GetInfo($scope.email);

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
    		$timeout(function () {
    			$scope.ratingClick = 0;
    		},5000);
    		
    		console.log("rating");
    	}

    	$scope.feedback = function (element) {
    		jQuery('#'+element).modal('show');
    	}

    	$scope.rating = function () {
    		$scope.rating_feedback = $scope.rating_feedback;
    	}

    	$scope.sendFeedback = function () {
    		$scope.accessToken = sessionStorage.accessToken;
    		var msg = $scope.title_feedback + ": " + $scope.msg_feedback;
    		// console.log($scope.accessToken);
    		UserService.SendFeedback($scope.email,$scope.accessToken,msg).then(function (res) {
    			// body...
    			jQuery('#feedback').modal('hide');
    		}, function (res) {
    			// body...
    			jQuery('#feedback').modal('hide');
    		});

    		console.log($scope.rating_feedback);


    		UserService.RatingFeedback($scope.email,$scope.accessToken,$scope.rating_feedback).then(function (res) {
    			// body...
    		}, function (res) {
    			// body...
    		});
    	}
    }

})();