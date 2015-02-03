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

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      console.log("Send Msg");
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.contacts._id})
        .$promise
        .then(function(conversation){
          console.log(conversation);
          Conversation.sendMsg({_id: conversation._id, message: message, to: $scope.contacts.primaryPhone, from: $scope.user.phone})
        });

      $scope.msgToSend = "";
      // console.log($scope.user);
    };

  });
