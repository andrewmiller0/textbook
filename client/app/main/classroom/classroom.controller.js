'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, $anchorScroll, User, Auth) {
    $scope.user = Auth.getCurrentUser();;

    $scope.user.classrooms.forEach(function(classroom) {
      if(classroom._id === $stateParams.classId) {
        $scope.currentClass = classroom;
      }
    });

    $scope.toggleContacts = function(student) {
      $scope.contacts = student.contacts;
      $scope.id = student._id;
    };

    $scope.gotoBottom = function() {
      console.log('anchorscroll');
      $location.hash('bottom');
      $anchorScroll();
    };

    $scope.activeContact;
    $scope.setActive = function(contact){
      $scope.activeContact = contact;
      console.log ($scope.activeContact);
      $scope.getConvo($scope.gotoBottom);
    }

    $scope.isSent = function(message){
      return message.type === 'sent';
    }

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      console.log(message);
      console.log("Conversation = ", $scope.conversation);
      var reqBody = {
        _id: $scope.conversation._id,
        message: message,
        to: $scope.activeContact.phone,
        from: $scope.user.phone,
        userId: $scope.user._id,
        contactId: $scope.activeContact._id
      };
      console.log(reqBody)
      Conversation.sendMsg(reqBody).$promise.then(function(message){
        console.log(message);
        $scope.messages.push(message);
      })

      $scope.msgToSend = "";

    };

    $scope.messages;
    $scope.getConvo = function(cb){
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.activeContact._id})
        .$promise
        .then(function(conversation){
          console.log(conversation);
          $scope.conversation = conversation.data[0];
          $scope.messages = conversation.data[0].messages;
          setTimeout(function(){ cb() }, 0);

        });
    }

    $scope.deleteClassroom = function(classroomId) {
      Classroom.delete({id: classroomId});
      $scope.user.classrooms.forEach(function(classroom, i) {
        if(classroom._id === classroomId) {
          $scope.user.classrooms.splice(i, 1);
          User.update({id: $scope.user._id}, $scope.user);
          $scope.$emit('delete classroom', classroom);
        }
      })
    };
  });
