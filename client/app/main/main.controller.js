'use strict';

angular.module('textbookApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Classroom, User, $location, Student, Conversation) {

  	User.get().$promise.then(function(user) {
      $scope.user = user;
      $scope.classrooms = user.classrooms;
      if($scope.user.classrooms.length === 0) {
      	$location.path('/settings');
      } else {
      	setcurrentClassroom(user.classrooms[0]._id);
      }
    });
    $scope.msgToSend;
    $scope.sendMsg = function(message){
      // console.log(message);
      // Conversation.sendMsg({message: message});
      // console.log($scope.contacts);
      Conversation.getConversation(
        {
          userId: $scope.user._id,
          contactId: $scope.contacts._id
          })
        .$promise
        .then(function(conversation){
          console.log(conversation);
          Conversation.sendMsg(
            {
              _id: conversation._id,
              message: message,
              to: $scope.contacts.primaryPhone,
              from: $scope.user.phone
            });
        });

      $scope.msgToSend = "";
      // console.log($scope.user);
    };


    $scope.toggleClassrooms = function(name) {
    	$scope.user.classrooms.forEach(function(classroom) {
    		if(classroom.name === name) {
    			setcurrentClassroom(classroom._id);
    		}
    	});
    };

    $scope.toggleContacts = function(argId) {
    	if($scope.id === argId) {
    		$scope.id = '';
    		$scope.contacts = '';
    	} else {
	    		Student.get({id: argId}, function(student) {
	    		console.log(student);
	    		$scope.contacts = student.contacts;
	    		$scope.id = argId;
	    		console.log($scope.contacts);
    		});
    	}

    };

    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}

  });
