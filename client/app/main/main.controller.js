'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, User, $state, Auth) {

    $scope.user = Auth.getCurrentUser();

  });
