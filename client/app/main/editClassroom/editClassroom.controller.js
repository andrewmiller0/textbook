'use strict';

angular.module('textbookApp')
  .controller('EditClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student) {
  		User.get().$promise.then(function(user) {
    		$scope.user = user;
      		setcurrentClassroom($stateParams.className);
    	});
    	var setcurrentClassroom = function(id) {
    		var contacts = [];
			Classroom.get({id: id}, function(classroom) {
				classroom.students.forEach(function(student) {
					Student.get({id: student._id}, function(popStudent) {
						student.contacts = popStudent.contacts;
					});
				});
				$scope.classroom = classroom;
	    	});
		};
		// $scope.addStudent = function() {
  //     if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
  //        $scope.classroom.students.push($scope.currentStudent);
  //        var studentToSave = _.clone($scope.currentStudent);
  //        console.log($scope.currentStudent);
  //        console.log(studentToSave);
  //        studentToSave.contacts = studentToSave.contacts.map(function(contact) {return contact._id});
  //        Student.save(studentToSave, function(student) {
  //        	console.log(student);
  //         $scope.classroom.students[$scope.classroom.students.length - 1]._id = student._id;
  //         $scope.currentStudent = {
  //           firstName: "",
  //           lastName: "",
  //           primaryPhone: "",
  //           contacts: []
  //          };
  //        });

  //     }
  //   };

    $scope.updateClassroom = function() {
      console.log($scope.classroom);
      $scope.classroom.students = $scope.classroom.students.map(function(student) {return student._id});
      Classroom.update($scope.classroom, function(classroom) {
      	$scope.user.classrooms = $scope.user.classrooms.map(function(classroom2) {return classroom2._id});
        console.log($scope.user)
        User.update($scope.user);
      });
    };
  });
