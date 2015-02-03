'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Classroom, User, $location) {
  	
  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length === 0) {
      	$location.path('/settings');
      } else {
      	setcurrentClassroom(user.classrooms[0]._id);
      }
    });

    $scope.toggleClassrooms = function(name) {
    	$scope.user.classrooms.forEach(function(classroom) {
    		if(classroom.name === name) {
    			setcurrentClassroom(classroom._id);
    		}
    	}); 
    };

    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}

  });