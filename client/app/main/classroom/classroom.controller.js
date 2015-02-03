'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student) {
    User.get().$promise.then(function(user) {
    	$scope.user = user;
      	setcurrentClassroom($stateParams.className);
    });

   $scope.toggleClassrooms = function(name) {
    	$scope.user.classrooms.forEach(function(classroom) {
    		if(classroom.name === name) {
    			setcurrentClassroom(classroom._id);
    		}
    	}); 
    };

    $scope.toggleContacts = function(argId) {
    	if($scope.id === argId) {
    		$scope.id = '';
    		$scope.contacts = '';
    	} else {
	    		Student.get({id: argId}, function(student) {
	    		console.log(student);
	    		$scope.contacts = student.contacts;
	    		$scope.id = argId;
	    		console.log($scope.contacts);
    		});
    	}
    	
    };

    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}

       var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}
  });
