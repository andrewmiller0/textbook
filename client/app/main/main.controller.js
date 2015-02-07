'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, User, $state, Auth) {

  	$scope.user = Auth.getCurrentUser();
  	if($scope.user.classrooms.length !== 0) {
      	$state.go('classrooms.classroom');
      }
  });
