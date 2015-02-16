'use strict';

angular.module('textbookApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Classroom, User, $state, $modal, newClass) {
    Auth.isLoggedInAsync(function(bol) {
      if(bol) {
        Auth.getCurrentUser().$promise.then(function(user) {
          $scope.user = user;
          $scope.selected = {
            classroom: {}
          };
          $scope.selected.classroom = $scope.user.classrooms[0];
          $scope.students = [];
          $scope.user.classrooms.forEach(function(classroom) {
            $scope.students.push(classroom.students);
          });
          $scope.students = _.flatten($scope.students);

        });
      } else {
        $scope.selected = {
            classroom: {}
          };
      }
     });
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.body;
    $scope.to = [];
    $scope.term;
    $scope.results;
    $scope.selectedClass = 'Select a Class';

    $scope.logout = function() {
      newClass.set(false);
      $scope.selected.classroom = {}; 
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.setClassroomDropdown = function(classId) {
      angular.forEach($scope.user.classrooms, function(classroom) {
          if(classroom._id === classId) {
            $scope.selected.classroom = classroom;
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
    $scope.close = function() {
      $scope.groupMessager.close();
    };
    $scope.$on('updated user', function(event, data) {
      $scope.user = Auth.getCurrentUser();
    });
    $scope.$on('updated class', function(event, data) {
      $scope.selected.classroom = data;
    });

  });