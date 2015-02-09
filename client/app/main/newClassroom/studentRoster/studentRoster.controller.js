'use strict';

angular.module('textbookApp')
  .controller('StudentRosterCtrl', function ($scope) {
  	$scope.rows = [];
  	$scope.columnNames = Object.keys($scope.studentRoster[0]);
  	$scope.modelNames = {'firstName':'first name', 'lastName': 'last name', 'name': 'primary contact\'s name', 'phone': 'primary contact\'s phone number', 'relationship': 'relation to primary contact'};
  	$scope.columnSelected = {};
  	console.log($scope.columnNames);
    angular.forEach($scope.studentRoster, function(column) {
    	$scope.rows.push(column);
    });

    $scope.changeDataKey = function(model) {
    	console.log($scope.columnSelected);
    	$scope.studentRoster.forEach(function(column) {
    		for(var key in column) {
    			if(key === $scope.columnSelected[model]) {
    				console.log($scope.columnSelected[model])
    				column[model] = column[key];
    				delete column[key]; 
    			}
    		}
    	});
    	console.log($scope.studentRoster[0]);
    };
  });
