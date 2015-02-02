'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.user = Auth.getCurrentUser();
  });
