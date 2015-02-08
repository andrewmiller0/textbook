'use strict';

angular.module('textbookApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, User, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('classrooms');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
