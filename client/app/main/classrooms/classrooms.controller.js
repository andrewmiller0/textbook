'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state, Auth) {

    $scope.user = Auth.getCurrentUser();
    console.log($scope.user);
    $scope.$on('updated user', function(event, data) {
      $scope.user = Auth.getCurrentUser();  
    });
    $scope.$on('delete classroom', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        if(user.classrooms.length === 0) {
          $state.go('classrooms');
        } else {
          $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
        }
      });
    });
  });
