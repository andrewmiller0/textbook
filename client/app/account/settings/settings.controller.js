'use strict';

angular.module('textbookApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, Classroom, newClass) {
    $scope.errors = {};
    User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
    });
    newClass.set(true);
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
