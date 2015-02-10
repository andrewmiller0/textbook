'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, User, Auth, socket) {
   var applyFlags = function() {
    console.log($scope.unread);
      for (var classKey in $scope.unread) {
        if ($scope.currentClass._id === classKey) {
          for (var studentKey in $scope.unread[classKey]) {
            // console.log("applying flag to student", studentKey);
            angular.element("#" + studentKey).html(' <i class="fa fa-comment"></i>');
          }
        }
      }
    };

    $scope.user.classrooms.forEach(function(classroom) {
      if(classroom._id === $stateParams.classId) {
        $scope.currentClass = classroom;
        setTimeout(function(){ applyFlags(); }, 0);
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
      if ($scope.unread[$scope.currentClass._id] && $scope.unread[$scope.currentClass._id][student._id]) {
        for (var contactKey in $scope.unread[$scope.currentClass._id][student._id]) {
          angular.element("#" + contactKey).html('&nbsp;<span class="badge">'+ $scope.unread[$scope.currentClass._id][student._id][contactKey] +'</span>');
        }
      }
    };

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
      if (!$stateParams.contactId || $stateParams.contactId !== res.convo.contactId) {
        $scope.user.classrooms.forEach(function(classroom) {
          classroom.students.forEach(function(student) {
            student.contacts.forEach(function(c){ console.log(c._id, res.convo.contactId) });
            var contact = _.find(student.contacts, function(c) { return c._id == res.convo.contactId});
              if (contact) {
                if ($scope.unread[classroom._id] && $scope.unread[classroom._id][student._id] && $scope.unread[classroom._id][student._id][contact._id]) {
                  console.log("adding 1 to the unread object", $scope.unread);
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
                // console.log($scope.unread);
                $scope.$emit('flag change', {
                  unread: $scope.unread,
                  type: 'unread'
                });
                applyFlags();
                return;
              }
            });
          })
          }
        });
  });
