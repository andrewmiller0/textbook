'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, Classroom, Student, Conversation, Contact, $location, User, Auth, socket) {
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

    $scope.deleteClassroom = function(classroomId) {
      Classroom.delete({id: classroomId});
      $scope.user.classrooms.forEach(function(classroom, i) {
        if(classroom._id === classroomId) {
          $scope.user.classrooms.splice(i, 1);
          var unpopulatedUser = angular.copy($scope.user);
          unpopulatedUser.classrooms = unpopulatedUser.classrooms.map(function(classroom) {return classroom._id});
          User.update({id: $scope.user._id}, unpopulatedUser);
          $scope.$emit('delete classroom', classroom);
        }
      });
    };
  });
