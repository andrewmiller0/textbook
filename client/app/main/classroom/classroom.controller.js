'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams) {
    $scope.classroom = $stateParams.className;
    console.log($scope.classroom);
  });
