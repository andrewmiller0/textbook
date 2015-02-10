'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, $state, $stateParams, User, Classroom, Student, Auth, Conversation) {
    $scope.user = Auth.getCurrentUser();

    $scope.unread = {};

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
      applyFlag();
    });

    var applyFlag = function() {
      for (var key in $scope.unread) {
        if (!$stateParams.classId || $stateParams.classId !== key) {
          console.log("applying flag");
          angular.element('#'+key).html(' <i class="fa fa-comment"></i>');
        }
      }
    };

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

    $scope.$on('flag change', function(event, data) {
      $scope.unread = data.unread;
      if (data.type == 'unread') applyFlag();
    });
});
