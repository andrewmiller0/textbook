'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Auth, Classroom, User, socket) {
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
      });
    };
  });
