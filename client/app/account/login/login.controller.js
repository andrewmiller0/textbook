'use strict';

angular.module('textbookApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, User) {
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
          User.get().$promise.then(function(user) {
            if(user.classrooms.length === 0) {
              $location.path('/');
            } else {
              $location.path('/classrooms');
            }
    });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
