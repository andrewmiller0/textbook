'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, Contact, $state, Auth) {
    
    $scope.user = Auth.getCurrentUser();
    if ($scope.user.$promise) {
      $scope.user.$promise.then(function(user) {
        $scope.user = user;
      })
    }
    console.log($scope.user);
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
      console.log($scope.classroom);
      // $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.update($scope.classroom, function(classroom) {
        Auth.updateUser($scope.user);
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
