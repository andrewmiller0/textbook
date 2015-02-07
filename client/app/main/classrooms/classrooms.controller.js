'use strict';

angular.module('textbookApp')
  .controller('ClassroomsCtrl', function ($scope, User, Classroom, Student, $state, Auth, socket, $http) {
  	 $scope.user = Auth.getCurrentUser();
    if ($scope.user.$promise) {
      $scope.user.$promise.then(function(user) {
        $scope.user = user;
      })
    }
    // User.get().$promise.then(function(user) {
    //   $scope.user = user;
    //   console.log(user);
    //   $scope.classrooms = user.classrooms;
    //   if($scope.user.classrooms.length === 0) {
    //   	// $state.go('main');
    //   } else {
    //   	// $location.path('/classrooms');
    //   	// $state.go('classrooms.classroom', {classId: user.classrooms[0]._id});
    //   }
    // });

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

    socket.socket.on('conversation:save', function(convo){
      // OKAY NO I SHOULD NOT HAVE TO DO THIS.  WHY IS THIS A THING.
      // $scope.classrooms.forEach(function(classroom) {
      //   Classroom.get({id: classroom._id}, function(retrievedClassroom) {
      //     retrievedClassroom.$promise.then(function(deal) {
      //       deal.students.forEach(function(student){
      //         student.contacts.forEach(function(retrievedContactId) {
      //           console.log(retrievedContactId, convo.contactId)
      //           if (retrievedContactId == convo.contactId && $stateParams.className !== deal._id) {
      //             console.log($stateParams, deal._id);
      //             angular.element("#"+deal._id).html(deal.name + '<span class="glyphicon glyphicon-asterisk"></span>');
      //           }
      //         });
      //       });
      //     });
      //   });
      // });
    });
});
