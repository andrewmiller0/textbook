'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state, Auth) {

    $scope.user = Auth.getCurrentUser();

    $scope.$on('updated user', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        $scope.classrooms = user.classrooms;
      });
    });
    $scope.$on('delete classroom', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        $scope.classrooms = user.classrooms;
        if(user.classrooms.length === 0) {
          $state.go('main');
        } else {
          $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
        }
      });
    });
  });
