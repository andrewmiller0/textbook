'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, socket, $state) {
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
      $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.update($scope.classroom, function(classroom) {
      	$scope.user.classrooms = $scope.user.classrooms.map(function(classroom2) {return classroom2._id});
        User.update($scope.user);
        $scope.$emit('updated user', $scope.user);
        $state.go('classrooms.classroom', {className: $stateParams.className});
      });
    };

    $scope.deleteStudent = function(studentId) {
      $scope.classroom.students.forEach(function(student, i) {
        if(student._id === studentId) {
          Student.delete({id: student._id});
          $scope.classroom.students.splice(i,1);
        }
      });
    };
  });
