'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state) {
  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length === 0) {
      	$state.go('main');
      } else {
      	// $location.path('/classrooms');
      	$state.go('classrooms.classroom', {className: user.classrooms[0]._id});
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
