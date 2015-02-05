'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, socket) {
  		User.get().$promise.then(function(user) {
    		$scope.user = user;
      		setcurrentClassroom($stateParams.className);
    	});
    	var setcurrentClassroom = function(id) {
    		var contacts = [];
			Classroom.get({id: id}, function(classroom) {
				classroom.students.forEach(function(student) {
					Student.get({id: student._id}, function(popStudent) {
						student.contacts = popStudent.contacts;
					});
				});
				$scope.classroom = classroom;
	    	});
		};

    $scope.updateClassroom = function() {
      console.log($scope.classroom);
      $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.update($scope.classroom, function(classroom) {
      	$scope.user.classrooms = $scope.user.classrooms.map(function(classroom2) {return classroom2._id});
        console.log($scope.user)
        User.update($scope.user);
        // socket.socket.on('classroom'+$scope.classroom._id, function(classroom) {
        //   $scope.classroom = classroom;
        // });
      });
    };
  });
