'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Auth, Classroom, User, socket, Student) {
    $scope.user = User.getUnpopulated({id: Auth.getCurrentUser()._id});
    console.log($scope.user.classrooms);
    
    $scope.classroom = {
      students: []
    };

    $scope.studentBeingEdited = {};

    $scope.setStudentBeingEdited = function(student) {
        $scope.studentBeingEdited = student;
    }

    $scope.addClassroom = function() {
      $scope.submitted = true;
      $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.save($scope.classroom, function(classroom) {
        $scope.user.classrooms.push(classroom._id);
        User.update($scope.user);
        $scope.classroom.name = '';
        $scope.classroom.students = [];
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
