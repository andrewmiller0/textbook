'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, $location, Classroom, Student) {
  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length === 0) {
      	$location.path('/');
      } else {
      	// $location.path('/classrooms');
      	$location.path('/classrooms/' + user.classrooms[0]._id);
      }
    });

  //   $scope.toggleClassrooms = function(name) {
  //   	$scope.user.classrooms.forEach(function(classroom) {
  //   		if(classroom.name === name) {
  //   			setcurrentClassroom(classroom._id);
  //   		}
  //   	}); 
  //   };

  //   $scope.toggleContacts = function(argId) {
  //   	if($scope.id === argId) {
  //   		$scope.id = '';
  //   		$scope.contacts = '';
  //   	} else {
	 //    		Student.get({id: argId}, function(student) {
	 //    		console.log(student);
	 //    		$scope.contacts = student.contacts;
	 //    		$scope.id = argId;
	 //    		console.log($scope.contacts);
  //   		});
  //   	}
    	
  //   };

  //   var setcurrentClassroom = function(id) {
		// Classroom.get({id: id}, function(classroom) {
  //   			$scope.currentClass = classroom;
  //   	});
	// }
  });
