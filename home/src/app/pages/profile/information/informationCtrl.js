(function () {
    'use strict';

    angular.module('ExpertExchange.pages.profile')
        .controller('informationCtrl', informationCtrl);

    /** @ngInject */
    function informationCtrl($scope, $timeout, $window, $location, $stateParams, UserService) {
    	$scope.email = $stateParams.user_id;
    	$scope.user = sessionStorage.userName;
    	console.log($stateParams.user_id);
    	console.log($scope.user);
    	$scope.user_info = {};
    	$scope.ratingFeedback = 3;
    	$scope.listRate = [
	        {rate : "1", name : "1"},
	        {rate : "2", name : "2"},
	        {rate : "3", name : "3"},
	        {rate : "4", name : "4"},
	        {rate : "5", name : "5"}
	    ];

    	GetInfo($scope.email);

    	function GetInfo(email) {
    		UserService.GetByEmail(email).then(function (response) {
    			$scope.user_info = response;
    			console.log($scope.user_info);
    		}, function (response) {
    			console.log(response);
    		});
    	}

    	$scope.feedback = function (element) {
    		$scope.accessToken = sessionStorage.accessToken;
    		if ($scope.accessToken)
    			jQuery('#'+element).modal('show');
    		else
    			$window.location.href = '/#/login';
    	}

    	$scope.editProfile = function (element) {
    		$scope.accessToken = sessionStorage.accessToken;
    		if ($scope.accessToken)
    			jQuery('#'+element).modal('show');
    		else
    			$window.location.href = '/#/login';
    	}

    	$scope.uploadImage = function (element) {
    		$scope.accessToken = sessionStorage.accessToken;
    		if ($scope.accessToken)
    			jQuery('#'+element).modal('show');
    		else
    			$window.location.href = '/#/login';
    	}

    	$scope.rating = function () {
    		console.log("rating");
    		$timeout(function() {
    			console.log($scope.ratingFeedback);
    		},1000);
            
    	}

    	$scope.sendFeedback = function () {    		
    		if ($scope.accessToken) {
	    		var msg = $scope.title_feedback + ": " + $scope.msg_feedback;	    		
	    		UserService.SendFeedback($scope.email, msg).then(function (res) {
	    			// body...
	    			jQuery('#feedback').modal('hide');
	    		}, function (res) {
	    			// body...
	    			jQuery('#feedback').modal('hide');
	    		});

	    		console.log($scope.ratingFeedback);


	    		UserService.RatingFeedback($scope.email, $scope.ratingFeedback).then(function (res) {
	    			// body...
	    		}, function (res) {
	    			// body...
	    		});
	    	} else {
	    		$window.location.href = '/#/login';
	    	}
    	}
    }

})();