'use strict';

angular.module('textbookApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, newClass) {

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.selectedClassroom = $scope.user.classrooms[0];
    });
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      newClass.set(false);
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });