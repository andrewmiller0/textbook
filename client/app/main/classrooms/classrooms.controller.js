'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, $state, User, Classroom, Student, Auth, Conversation) {

    // we still get occasional async problems with this.  i'd say 10-20% of the time.
    $scope.user = Auth.getCurrentUser();

    $scope.unread;

    // I want this to happen on login, but what if you're already logged in and you navigate away and back?
    $scope.user.$promise.then(function(user){
      user.classrooms.forEach(function(classroom) {
        classroom.students.forEach(function(student) {
          student.contacts.forEach(function(contact) {
            Conversation.getConversation({userId: user._id, contactId: contact._id})
            .$promise
            .then(function(conversation){
              if (conversation.unreadMessages > 0) {
                $scope.unread[classroom._id][student._id][contact._id] = conversation.unreadMessages;
              }
            });
          })
        });
      });
    });

    $scope.$on('updated user', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        $scope.classrooms = user.classrooms;
      });
    });

    $scope.$on('delete classroom', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        $scope.classrooms = user.classrooms;
        if(user.classrooms.length === 0) {
          $state.go('main');
        } else {
          $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
        }
      });
    });
});
