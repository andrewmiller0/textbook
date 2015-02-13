'use strict';

angular.module('textbookApp')
  .controller('StudentRosterCtrl', function ($scope, $state, Classroom, User, $http, Auth, newClass) {
  	$scope.newClass = {
  		students: []
  	};
  	$scope.columnNames = Object.keys($scope.studentRoster[0]);
  	$scope.modelNames = {'First Name':'first name', 'Last Name': 'last name', 'Contact Name': 'primary contact\'s name', 'Contact Phone': 'primary contact\'s phone number', 'Contact Relationship': 'relation to primary contact'};
  	$scope.progress = 0;
    $scope.columnSelected = {};
    console.log($scope.studentRoster);
    $scope.loading.name = false;

    $scope.changeDataKey = function(model) {
      $scope.loading.name = true;
      var i;
    	$scope.studentRoster.forEach(function(student) {
    		for(var key in student) {
    			if(key === $scope.columnSelected[model]) {
    				student[model] = student[key];
    				delete student[key]; 
    			}
    		}
    	});
      i = $scope.columnNames.indexOf($scope.columnSelected[model]);
      $scope.columnNames.splice(i, 1, model);
      console.log($scope.columnNames);
      $scope.progress = $scope.progress + 1;
      $scope.loading.name = false;
    };

    $scope.createClass = function() {
      $scope.validClass = true;
      if($scope.addClassSpreadsheetForm.$valid) {
      	User.getUnpopulated({id: $scope.user._id}, function(user) {
  	    	Classroom.save($scope.newClass, function(classroom) {
  	    		$scope.newClass._id = classroom._id;
  	    		user.classrooms.push(classroom._id);
  	    		User.update(user);
  	    	});
      	});
        $scope.progress = $scope.progress + 1;
        $scope.validClass = false;
        newClass.set(true);
      }
    };

    $scope.saveData = function() {
    	$http.post('/api/classrooms/'+ $scope.newClass._id +'/saveSpreadsheet', $scope.studentRoster)
    	.success(function(user) {
        User.get().$promise.then(function(user) {
          Auth.updateUser(user);
      		$state.go('classrooms.classroom', {classId: user.classrooms[user.classrooms.length-1]._id});
        });
    	});
    };
  });
