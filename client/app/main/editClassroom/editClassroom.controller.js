'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom) {
  		User.get().$promise.then(function(user) {
    		$scope.user = user;
      		setcurrentClassroom($stateParams.className);
    	});
    	var setcurrentClassroom = function(id) {
			Classroom.get({id: id}, function(classroom) {
	    			$scope.currentClass = classroom;
	    	});
		}
  });
