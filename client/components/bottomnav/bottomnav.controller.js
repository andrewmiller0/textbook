'use strict';

angular.module('textbookApp')
  .controller('BottomNavCtrl', function ($scope, $location, Auth, newClass) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });