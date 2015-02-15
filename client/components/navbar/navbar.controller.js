'use strict';

angular.module('textbookApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, newClass) {

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.selectedClassroom = $scope.user.classrooms[0];
      console.log('change');
    });
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      newClass.set(false);
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.showClassroom = function() {
      console.log($scope.selectedClassroom);
    }

    $scope.setClassroomDropdown = function(classId) {
      angular.forEach($scope.user.classrooms, function(classroom) {
          if(classroom._id === classId) {
            $scope.selectedClassroom = classroom;
          }
        });
      console.log($scope.selectedClassroom);
    };

     $scope.deleteClassroom = function(classroomId) {
      Classroom.delete({id: classroomId});
      $scope.user.classrooms.forEach(function(classroom, i) {
        if(classroom._id === classroomId) {
          $scope.user.classrooms.splice(i, 1);
          var unpopulatedUser = angular.copy($scope.user);
          unpopulatedUser.classrooms = unpopulatedUser.classrooms.map(function(classroom) {return classroom._id});
          User.update({id: $scope.user._id}, unpopulatedUser, function(user) {
            if($scope.user.classrooms.length === 0) {
              $state.go('classrooms');
            } else {
              $scope.selectedClassroom = $scope.user.classrooms[0];
              $state.go('classrooms.classroom', {classId: $scope.user.classrooms[0]._id});
            }
          });
        }
      });
    };

  });