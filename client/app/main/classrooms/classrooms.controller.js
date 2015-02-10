'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state, Auth, $modal) {

    $scope.user = Auth.getCurrentUser();

    $scope.open = function () {
        console.log('open');
        $modal.open({
            templateUrl: 'app/main/classrooms/homeworkmodal.html',
            backdrop: true,
            windowClass: 'modal',
            scope: $scope
        });
    };

    $scope.assignment;
    $scope.addAssignment = function(assignment){
      console.log($scope.currentClass);
      Classroom.addHomework({classId: $scope.currentClass, homework: assignment}).$promise.then(function(homework){

        console.log(homework);
      });
    }

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
