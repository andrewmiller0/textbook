'use strict';

angular.module('textbookApp')
  .controller('StudentRosterCtrl', function ($scope, $state, Classroom, User, $http, Auth, $q, $rootScope) {
  	$scope.newClass = {
  		students: []
  	};
  	$scope.columnNames = Object.keys($scope.studentRoster[0]);
  	$scope.modelNames = {'firstName':'first name', 'lastName': 'last name', 'name': 'primary contact\'s name', 'phone': 'primary contact\'s phone number', 'relationship': 'relation to primary contact'};
  	$scope.progress = 0;
    $scope.columnSelected = {};
    console.log($scope.studentRoster);

    $scope.changeDataKey = function(model) {
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
    };

    $scope.createClass = function() {
    	User.getUnpopulated({id: $scope.user._id}, function(user) {
	    	Classroom.save($scope.newClass, function(classroom) {
	    		$scope.newClass._id = classroom._id;
	    		user.classrooms.push(classroom._id);
	    		User.update(user);
	    	});
    	});
      $scope.progress = $scope.progress + 1;
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
