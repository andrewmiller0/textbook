'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, $state, Auth, Classroom, User, socket, Student) {
    $scope.user = Auth.getCurrentUser();
    $scope.file = {};
    $scope.addClassroom = function() {
      Classroom.save($scope.classroom, function(classroom) {
        $scope.user.classrooms.push(classroom);
        Auth.updateUser($scope.user);
        User.getUnpopulated({id: $scope.user._id}, function(user) {
          user.classrooms.push(classroom._id);
          User.update(user);
        });
        $state.go('classrooms.edit', {classId: classroom._id});
      });
    };
    $scope.uploadFile = function() {
      console.log($scope.file);
    }
  });
