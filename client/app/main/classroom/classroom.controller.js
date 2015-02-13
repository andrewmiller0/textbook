'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, User, Auth, socket, $state) {
    $scope.$on('activestudent', function(event, data) {
      $scope.activeStudent = data;
    });
    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.user.classrooms.forEach(function(classroom) {
        if(classroom._id === $stateParams.classId) {
          $scope.currentClass = classroom;
        }
      });
      $scope.findState = function() {
      return $state.is('classrooms.classroom');
    };
    });

   $scope.ids = {};

    $scope.toggleContacts = function(student) {
      $scope.activeStudent = '';
      if ($scope.ids[student._id]) {
        delete $scope.ids[student._id];
      }
      else {
        $scope.ids = {};
        $scope.ids[student._id] = true;
      }
    };
  });
