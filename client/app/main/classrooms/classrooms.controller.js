'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, $state, $stateParams, User, Classroom, Student, Auth, Conversation, socket, $modal) {

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.unread = {};
      var convArray = [];
      $scope.findfirstState = function() {
      return $state.is('classrooms');
    };
      Conversation.query().$promise.then(function(conversations) {
          conversations.forEach(function(convo) {
            if (convo.unreadMessages > 0) convArray.push(convo);
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
            });
            Conversation.setUnread($scope.unread);
          });
        });
        angular.forEach($scope.user.classrooms, function(classroom) {
          if(classroom._id === $state.params.classId) {
            $scope.selectedClassroom = classroom;
          } else {
            $scope.selectedClassroom = $scope.user.classrooms[0];
          }
        });
    });

    $scope.setClassroomDropdown = function(classId) {
      angular.forEach($scope.user.classrooms, function(classroom) {
          if(classroom._id === classId) {
            $scope.selectedClassroom = classroom;
          }
        });
    };
    
    $scope.open = function () {
        $modal.open({
            templateUrl: 'app/main/classrooms/homeworkmodal.html',
            backdrop: true,
            windowClass: 'modal',
            scope: $scope 
        });
    };

    $scope.close = function() {
      $scope.groupMessager.close();
    };

    $scope.openGroupMsg = function() {
        $scope.groupMessager = $modal.open({
            templateUrl: 'app/main/classrooms/groupMessager/messagemodal.html',
            controller: 'GroupMessagerCtrl',
            backdrop: true,
            windowClass: 'modal',
            size: 'lg',
            scope: $scope
        });
    };

    $scope.applySentAlert = function() {
      $scope.sentAlert = true;
    };

    $scope.status = {
      isopen: false
    };

    $scope.selectedClass = 'Select a Class';
    $scope.homeworkActiveClass = function(className){
      $scope.selectedClass = className;
    }
    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
    $scope.assignment = "";
    $scope.addAssignment = function(assignment){
      console.log(assignment)
      $scope.assignment = "";
      console.log($scope.selectedClass);
      for(var i = 0 ; i<$scope.user.classrooms.length; i++){
        if($scope.user.classrooms[i].name == $scope.selectedClass){
          var classObj = $scope.user.classrooms[i];
          console.log(classObj.homework);
        }
      }
      classObj.homework.push(assignment);
      Classroom.addHomework({classId: classObj._id, homework: assignment}).$promise.then(function(homework){
        console.log(homework);
        $scope.selectedClass = 'Select a Class';
      });
    };

    $scope.$on('updated user', function(event, data) {
      $scope.user = Auth.getCurrentUser();
    });

    $scope.$on('delete classroom', function(event, data) {
      User.get().$promise.then(function(user) {
        $scope.user = user;
        
      });
    });

    $scope.applyFlags = function(contactId) {
      $scope.unread = Conversation.getUnread();
    };

    socket.socket.on('new message', function(res){
      console.log(res.convo);
      if (!$state.params.contactId || $state.params.contactId !== res.convo.contactId) {
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
              }
            });
          })
       }
      else {
        res.convo.unreadMessages = 0;
        Conversation.update({id: res.convo._id}, res.convo);
      }
    });
});
