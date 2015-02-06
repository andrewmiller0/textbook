'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Classroom, User, $location, Student, Conversation) {

  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length !== 0) {
      	$location.path('/classrooms');
      }
    });

    // $http.put('/api/conversations', {id: }).success(function(result) {
    // 	socket.socket.on('contact:save', function(a, b, c, d) {
    // 		console.log(a);
    // 		console.log(b);
    // 		console.log(c);
    // 		console.log(d);
    // 	});
    // });
  });