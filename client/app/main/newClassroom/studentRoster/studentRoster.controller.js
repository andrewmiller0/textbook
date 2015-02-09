'use strict';

angular.module('textbookApp')
  .controller('StudentRosterCtrl', function ($scope, $interpolate) {
  	$scope.rows = [];
  	$scope.columnNames = Object.keys($scope.studentRoster[0]);
  	console.log($scope.columnNames);
    angular.forEach($scope.studentRoster, function(column) {
    	$scope.rows.push(column);
    });
  });
