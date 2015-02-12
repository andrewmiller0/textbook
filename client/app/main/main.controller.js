'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, User, $state, Auth, $modal) {

    $scope.user = Auth.getCurrentUser();

  });
