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

    $scope.activeContact;
    $scope.setActive = function(contact){
      $scope.activeContact = contact;
      console.log ($scope.activeContact);
      $scope.getConvo();
    }

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      console.log(message);
      var reqBody = {
        _id: $scope.conversation.data[0]._id,
        message: message,
        to: $scope.activeContact.phone,
        from: $scope.user.phone,
        userId: $scope.user._id,
        contactId: $scope.activeContact._id
      };
      console.log(reqBody)
      Conversation.sendMsg(reqBody);
      $scope.msgToSend = "";
    };

    $scope.messages;
    $scope.getConvo = function(){
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.activeContact._id})
        .$promise
        .then(function(conversation){
          console.log(conversation);
          $scope.conversation = conversation;
          $scope.messages = conversation.messages;
        });
    }


    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}
  });
