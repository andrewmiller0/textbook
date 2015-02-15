'use strict';

angular.module('textbookApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Classroom, User, $state, $modal) {

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      $scope.selectedClassroom = $scope.user.classrooms[0];
      $scope.students = [];
      $scope.user.classrooms.forEach(function(classroom) {
        $scope.students.push(classroom.students);
      });
      $scope.students = _.flatten($scope.students);

    });
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.body;
    $scope.to = [];
    $scope.term;
    $scope.results;

    $scope.logout = function() {
      newClass.set(false);
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.setClassroomDropdown = function(classId) {
      angular.forEach($scope.user.classrooms, function(classroom) {
          if(classroom._id === classId) {
            $scope.selectedClassroom = classroom;
          }
        });
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

        $scope.open = function () {
        $modal.open({
            templateUrl: 'app/main/classrooms/homeworkmodal.html',
            backdrop: true,
            windowClass: 'modal',
            scope: $scope 
        });
    };

  });