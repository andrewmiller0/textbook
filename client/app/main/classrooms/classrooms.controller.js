'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state) {
  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length === 0) {
      	$state.go('main');
      } else {
      	// $location.path('/classrooms');
      	$state.go('classrooms.classroom', {className: user.classrooms[0]._id});
      }
    });

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
          $state.go('classrooms.classroom', {className: user.classrooms[0]._id});
        }
      });
    });
  });
