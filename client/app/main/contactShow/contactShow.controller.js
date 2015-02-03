'use strict';

angular.module('textbookApp')
  .controller('ContactShowCtrl', function ($scope, $stateParams, Student) {

  	Student.get({id: $stateParams.studentName}, function(student) {
	    		console.log(student);
	    		$scope.contacts = student.contacts;
	    		$scope.id = student._id
	    		console.log($scope.contacts);
	    	});
  });
