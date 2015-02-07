'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state, Auth) {
  	 $scope.user = Auth.getCurrentUser();
    if ($scope.user.$promise) {
      $scope.user.$promise.then(function(user) {
        $scope.user = user;
      })
    }
    // User.get().$promise.then(function(user) {
    //   $scope.user = user;
    //   console.log(user);
    //   $scope.classrooms = user.classrooms;
    //   if($scope.user.classrooms.length === 0) {
    //   	// $state.go('main');
    //   } else {
    //   	// $location.path('/classrooms');
    //   	// $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
    //   }
    // });

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
