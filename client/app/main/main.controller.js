'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, User, $state) {

  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length !== 0) {
      	$state.go('classrooms.classroom');
      }
    });
  });
