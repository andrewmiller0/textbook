'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, Contact, $state, Auth) {
    
    $scope.user.classrooms.forEach(function(classroom) {
      if(classroom._id === $stateParams.classId) {
        $scope.classroom = classroom;
      }
    });

    $scope.updateClassroom = function() {
      $scope.classSubmit = true;
      if($scope.classForm.$valid) {
        console.log($scope.classroom);
        var unpopulated = angular.copy($scope.classroom);
        unpopulated.students = unpopulated.students.map(function(student) {return student._id});
        Classroom.update(unpopulated, function(classroom) {
          // $scope.$emit('updated user', $scope.user);
          $scope.classSubmit = false;
        });
      }
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
