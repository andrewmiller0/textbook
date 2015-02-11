'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, $state, $stateParams, User, Classroom, Student, Auth, Conversation, socket) {
    $scope.user = Auth.getCurrentUser();
    $scope.unread = {};

    // $scope.user.$promise.then(function(user){
    //   user.classrooms.forEach(function(classroom) {
    //     classroom.students.forEach(function(student) {
    //       student.contacts.forEach(function(contact) {
    //         Conversation.getConversation({userId: user._id, contactId: contact._id})
    //         .$promise
    //         .then(function(conversation){
    //           if (conversation.unreadMessages > 0) {
    //             $scope.unread[classroom._id][student._id][contact._id] = conversation.unreadMessages;
    //           }
    //         });
    //       })
    //     });
    //   });
    //   applyFlags();
    // });

    var convArray = Conversation.query().$promise.then(function(conversations) {
        console.log (_(conversations).filter(function(convo) {
          convo.unreadMessages > 0;
        }).value());
      });

    $scope.user.$promise.then(function(user) {
      user.classrooms.forEach(function(classroom) {
        classroom.students.forEach(function(student) {
          student.contacts.forEach(function(contact) {
            if (_.find(convArray, function(convo) {
              return convo.contactId == contact._id
            })) {
              // for now.  i know this is so bad
              var additionToUnread = {};
              additionToUnread[classroom._id] = {};
              additionToUnread[classroom._id][student._id] = {};
              additionToUnread[classroom._id][student._id][contact._id] = 1;
              _.merge($scope.unread, additionToUnread);
            }
          })
        })
      })
      Conversation.unread = $scope.unread;
      $scope.applyFlags();
    })


    $scope.$on('updated user', function(event, data) {
      $scope.user = Auth.getCurrentUser();  
    });

    $scope.$on('delete classroom', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        if(user.classrooms.length === 0) {
          $state.go('classrooms');
        } else {
          $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
        }
      });
    });

    $scope.$on('read', function(event, data) {
      $scope.unread = data;
    });

    $scope.applyFlags = function(contactId) {
      if (!contactId || $state.params.contactId !== contactId) {
        for (var classKey in $scope.unread) {
          angular.element('#'+classKey).html('<i class="fa fa-comment"></i>');
          if ($state.params.classId === classKey) {
            for (var studentKey in $scope.unread[classKey]) {
              angular.element("#" + studentKey).html(' <i class="fa fa-comment"></i>');
              for (var contactKey in $scope.unread[classKey][studentKey]) {
                angular.element("#" + contactKey).html('&nbsp;<span class="badge">'+ $scope.unread[classKey][studentKey][contactKey] +'</span>');
                }
              }
            }
          }
       }
    }

    socket.socket.on('new message', function(res){
      if (!$stateParams.contactId || $stateParams.contactId !== res.convo.contactId) {
        $scope.user.classrooms.forEach(function(classroom) {
          classroom.students.forEach(function(student) {
            var contact = _.find(student.contacts, function(c) { return c._id == res.convo.contactId});
              if (contact) {
                if ($scope.unread[classroom._id] && $scope.unread[classroom._id][student._id] && $scope.unread[classroom._id][student._id][contact._id]) {
                  $scope.unread[classroom._id][student._id][contact._id]++;
                }
                else {
                  // i am so sorry for this
                  var additionToUnread = {};
                  additionToUnread[classroom._id] = {};
                  additionToUnread[classroom._id][student._id] = {};
                  additionToUnread[classroom._id][student._id][contact._id] = 1;
                  _.merge($scope.unread, additionToUnread);
                }
                $scope.applyFlags(res.convo.contactId);
                return;
              }
            });
          })
          }
        });
});
