'use strict';

angular.module('textbookApp')
  .controller('ConversationCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, $anchorScroll, socket) {
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

	Conversation.getConversation({userId: $scope.user._id, contactId: contactId})
        .$promise
        .then(function(conversation){
          $scope.conversation = conversation.data[0];
          $scope.messages = conversation.data[0].messages;

          $scope.conversation.unreadMessages = 0;
          for (var studentKey in $scope.unread[classId]) {
            for (var contactKey in $scope.unread[classId][studentKey]) {
              if (contactKey == contactId) {
                delete $scope.unread[classId][studentKey][contactKey]
                angular.element("#"+contactKey).html('&nbsp;');
                if (!Object.keys($scope.unread[classId][studentKey]).length) {
                  delete $scope.unread[classId][studentKey];
                  angular.element('#'+studentKey).html('&nbsp;');
                  if (!Object.keys($scope.unread[classId]).length) {
                    delete $scope.unread[classId];
                    angular.element('#'+classId).html('&nbsp;');
                  }
                }
              }
            }
          }
          $scope.$emit('read', $scope.unread);
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

    $scope.messages;

    socket.socket.on('new message', function(res){
      if ($stateParams.contactId == res.convo.contactId) {
        $scope.messages.push(_.last(res.convo.messages));
      }
  	});
});
