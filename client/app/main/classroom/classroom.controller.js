'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, Conversation) {
    User.get().$promise.then(function(user) {
    	$scope.user = user;
      	setcurrentClassroom($stateParams.className);
    });

   $scope.toggleClassrooms = function(name) {
    	$scope.user.classrooms.forEach(function(classroom) {
    		if(classroom.name === name) {
    			setcurrentClassroom(classroom._id);
    		}
    	});
    };

    $scope.toggleContacts = function(argId) {
			Student.get({id: argId}, function(student) {
				$scope.contacts = student.contacts;
				$scope.id = argId;
			});

    };

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      console.log("Send Msg");
      console.log(message);
      console.log($scope.contacts._id);
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.contacts._id})
        .$promise
        .then(function(conversation){
          console.log(conversation.data);
          Conversation.sendMsg({_id: conversation.data[1]._id, message: message, to: $scope.contacts.primaryPhone, from: $scope.user.phone})
        });

      $scope.msgToSend = "";
      // console.log($scope.user);
    };


    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}

       var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}
  });
