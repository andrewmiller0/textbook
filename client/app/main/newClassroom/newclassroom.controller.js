'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, $state, Auth, Classroom, User, socket, Student) {
    $scope.user = User.getUnpopulated({id: Auth.getCurrentUser()._id});
    
    $scope.addClassroom = function() {
      Classroom.save($scope.classroom, function(classroom) {
        $scope.user.classrooms.push(classroom._id);
        User.update($scope.user);
        $state.go('classrooms.edit', {classId: classroom._id});
      });
    };
  });
