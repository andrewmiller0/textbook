'use strict';

angular.module('textbookApp')
  .controller('ConversationCtrl', function ($scope, $stateParams, $location, $anchorScroll, socket, Classroom, Student, Conversation, Contact) {
    var classId = $stateParams.classId,
      contactId = $stateParams.contactId,
      studentId = $stateParams.studentId;
      $scope.$emit('activestudent', studentId);
      Contact.get({id: contactId}, function(contact){
        $scope.activeContact = contact;
      });

   $scope.gotoBottom = function() {
      $location.hash('bottom');
      $anchorScroll();
    };

    $scope.unread = Conversation.getUnread()

  Conversation.getConversation({userId: $scope.user._id, contactId: contactId})
        .$promise
        .then(function(conversation){
          $scope.conversation = conversation;
          $scope.messages = conversation.messages;

          $scope.conversation.unreadMessages = 0;
          for (var studentKey in $scope.unread[classId]) {
            for (var contactKey in $scope.unread[classId][studentKey]) {
              if (contactKey == contactId) {
                delete $scope.unread[classId][studentKey][contactKey]
                if (!Object.keys($scope.unread[classId][studentKey]).length) {
                  delete $scope.unread[classId][studentKey];
                  if (!Object.keys($scope.unread[classId]).length) {
                    delete $scope.unread[classId];
                  }
                }
              }
            }
          }
          Conversation.setUnread($scope.unread);
          Conversation.update({id: $scope.conversation._id}, $scope.conversation);
        });

  $scope.isSent = function(message){
      return message.type === 'sent';
    }

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      var reqBody = {
        _id: $scope.conversation._id,
        message: message,
        from: $scope.user.phone,
        to: $scope.activeContact.phone,
        userId: $scope.user._id,
        contactId: contactId
      };
      Conversation.sendMsg(reqBody).$promise.then(function(message){
        $scope.messages.push(message);
      });

      $scope.msgToSend = "";
    };

    socket.socket.on('new message', function(res){
      if ($stateParams.contactId == res.convo.contactId) {
        $scope.messages.push(_.last(res.convo.messages));
      }
    });

    $scope.$on('group message', function(event, message) {
      $scope.messages.push(message);
    });
});
