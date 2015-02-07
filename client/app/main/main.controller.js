'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Classroom, User, $location, Student, Conversation) {

  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length !== 0) {
      	$location.path('/classrooms');
      }
    });
  });