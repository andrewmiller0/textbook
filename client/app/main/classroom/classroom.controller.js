'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, $anchorScroll, User, Auth, socket) {
    $scope.activeContact = "";
    $scope.id = "";
   var applyFlags = function() {
      console.log($scope.unread);
      for (var classKey in $scope.unread) {
        if ($scope.currentClass._id === classKey) {
          for (var studentKey in $scope.unread[classKey]) {
            console.log("applying flag to student", studentKey);
            console.log(angular.element("#" + studentKey))
            angular.element("#" + studentKey).html(' <i class="fa fa-comment"></i>');
          }
        }
      }
    };

    $scope.user.classrooms.forEach(function(classroom) {
      if(classroom._id === $stateParams.classId) {
        $scope.currentClass = classroom;
        applyFlags();
      }
    });

   $scope.ids = {};

    $scope.toggleContacts = function(student) {
      if ($scope.ids[student._id]) {
        delete $scope.ids[student._id];
      }
      else {
        $scope.ids[student._id] = true;
      }
      console.log("this is happening now, not later");
      if ($scope.unread[$scope.currentClass._id] && $scope.unread[$scope.currentClass._id][student._id]) {
        console.log("am i being called?");
        for (var contactKey in $scope.unread[$scope.currentClass._id][student._id]) {
          angular.element("#" + contactKey).html('<span class="badge">'+ $scope.unread[$scope.currentClass._id][student._id][contactKey] +'</span>');
        }
      }
    };

    $scope.gotoBottom = function() {
      $location.hash('bottom');
      $anchorScroll();
    };

    $scope.setActive = function(contact){
      console.log($scope.activeContact);
      $scope.activeContact = contact;
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
        $scope.messages.push(message);
        console.log($scope.messages);
      })

      $scope.msgToSend = "";

    };

    $scope.messages;
    $scope.getConvo = function(cb){
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.activeContact._id})
        .$promise
        .then(function(conversation){
          $scope.conversation = conversation.data[0];
          $scope.messages = conversation.data[0].messages;
          if (cb) setTimeout(function(){ cb() }, 0);

          $scope.conversation.unreadMessages = 0;
          for (var studentKey in $scope.unread[$scope.currentClass._id]) {
            for (var contactKey in $scope.unread[$scope.currentClass._id][studentKey]) {
              if (contactKey == $scope.activeContact._id) {
                delete $scope.unread[$scope.currentClass._id][studentKey][contactKey]
                console.log("deleted contactKey");
                angular.element("#"+contactKey).html('&nbsp;');
                if (!Object.keys($scope.unread[$scope.currentClass._id][studentKey]).length) {
                  console.log("Deleted studentKey")
                  delete $scope.unread[$scope.currentClass._id][studentKey];
                  angular.element('#'+studentKey).html('&nbsp;');
                  if (!Object.keys($scope.unread[$scope.currentClass._id]).length) {
                    console.log("deleted classroom key")
                    delete $scope.unread[$scope.currentClass._id];
                    angular.element('#'+$scope.currentClass._id).html('&nbsp;');
                  }
                }
              }
            }
          }
          Conversation.update({id: $scope.conversation._id}, $scope.conversation);
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

    socket.socket.on('new message', function(res){
      console.log(_.last(res.convo.messages));
      if ($scope.conversation && $scope.conversation._id == res.convo._id) {
        $scope.getConvo();
      }
      else {
        $scope.user.classrooms.forEach(function(classroom) {
          classroom.students.forEach(function(student) {
            student.contacts.forEach(function(contact) {
              // THIS IS ALL SO BAD I AM SO SORRY I AM SURE THERE IS ANOTHER WAY
              if (res.convo.contactId == contact._id) {
                if ($scope.unread[classroom._id] && $scope.unread[classroom._id][student._id] && $scope.unread[classroom._id][student._id][contact._id]) {
                  $scope.unread[classroom._id][student._id][contact._id]++;
                }
                else {
                  // WHY
                  var additionToUnread = {};
                  additionToUnread[classroom._id] = {};
                  additionToUnread[classroom._id][student._id] = {};
                  additionToUnread[classroom._id][student._id][contact._id] = 1;
                  _.merge($scope.unread, additionToUnread);
                }
                // console.log($scope.unread);
                $scope.$emit('unread', $scope.unread);
                applyFlags();
                console.log($scope.unread);
                return;
              }
            })
          });
        });
      }
    });
  });
