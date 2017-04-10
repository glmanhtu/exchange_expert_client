(function() {
    'use strict';
    angular
        .module('ExpertExchange.pages.search')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$scope','$timeout','$location','registerService'];
    /* @ngInject */
    function registerCtrl($scope,$timeout,$location,registerService) {
        var vm = this;
        vm.title = 'registerCtrl';

        $scope.firstname = '';
        $scope.lastname = '';
        $scope.password = '';
        $scope.email = '';

        $scope.submitUser = (function(event) {
        	var isVal = true;
        	if ($scope.firstname == '') {
        		$("#isValFirstName").removeClass('hidden');
        		isVal = false;
        	} else {
        		$("#isValFirstName").addClass('hidden');
        		isVal = true;
        	}
        	if ($scope.lastname == '') {
        		$("#isValLastName").removeClass('hidden');
        		isVal = false;
        	} else {
        		$("#isValLastName").addClass('hidden');
        		isVal = true;
        	}
        	if ($scope.password == '') {
        		$("#isValPassword").removeClass('hidden');
        		isVal = false;
        	} else {
        		$("#isValPassword").addClass('hidden');
        		isVal = true;
        	}
        	if ($scope.email == '') {
        		$("#isValEmail").removeClass('hidden');
        		isVal = false;
        	} else {
        		$("#isValEmail").addClass('hidden');
        		isVal = true;
        	}

        	if (isVal == true) {
	        	var userData = {"firstName": $scope.firstname, "lastName": $scope.lastName, "id": $scope.email, "password": $scope.password }

	        	registerService.registerUser(userData).then(function(response) {
	        		console.log("Success");
	        		console.log(response);
	        		$location.path('/');


	        	}, function(response) {
	        		console.log("Error");
	        		console.log(response);
	        		alert(response.data.code + ": " + response.data.message)



	        	});

	        	$timeout( function(){
	                
	            }, 1000 );
	        	
	        }
        });

        $scope.register = function () {
            $scope.dataLoading = true;
            var userData = {"firstName": $scope.firstName, "lastName": $scope.lastName, "id": $scope.emailRegister, "password": $scope.password }

            registerService.registerUser(userData).then(function(response) {
                console.log("Success");
                console.log(response);
                $location.path('/login');

            }, function(response) {
                console.log(userData);
                $scope.dataLoading = false;
                console.log("Error");
                console.log(response);
                $scope.error = response.data.error + ": " + response.data.error_description;
            });
        };
    }
})();