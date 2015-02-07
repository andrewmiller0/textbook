'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, Contact, $state, Auth) {
    
    $scope.user = Auth.getCurrentUser();
    $scope.user.classrooms.forEach(function(classroom) {
      if(classroom._id === $stateParams.classId) {
        $scope.classroom = classroom;
      }
    });


  //   	var setcurrentClassroom = function(id) {
  //   		var contacts = [];
		// 	Classroom.get({id: id}, function(classroom) {
		// 		classroom.students.forEach(function(student) {
		// 			Student.get({id: student._id}, function(popStudent) {
		// 				student.contacts = popStudent.contacts;
		// 			});
		// 		});
		// 		$scope.classroom = classroom;
	 //    	});
		// };

    $scope.updateClassroom = function() {
      // $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.update($scope.classroom, function(classroom) {
      	$scope.user.classrooms = $scope.user.classrooms.map(function(classroom2) {return classroom2._id});
        User.update($scope.user);
        $scope.$emit('updated user', $scope.user);
        // $state.go('classrooms.classroom', {classId: $stateParams.classId});
      });
    };

    $scope.deleteStudent = function(studentId) {
      $scope.classroom.students.forEach(function(student, i) {
        if(student._id === studentId) {
          Student.get({id: student._id}, function(student) {
            student.contacts.forEach(function(contact) {
              Contact.delete({id: contact._id});
            });
          });
          Student.delete({id: student._id});
          $scope.classroom.students.splice(i,1);
        }
      });
    };
  });
