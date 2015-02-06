'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Auth, Classroom, User, socket, Student, Contact, $q) {
    $scope.user = User.getUnpopulated({id: Auth.getCurrentUser()._id});
    console.log($scope.user.classrooms);
    
    $scope.classroom = {
      students: []
    };

    $scope.studentBeingEdited = {};

    $scope.setStudentBeingEdited = function(student) {
        $scope.studentBeingEdited = student;
    }

    $scope.addClassroom = function() {
      var arr = [], studentArr = [];
     $scope.classroom.students.forEach(function(student) {
      student.contacts.forEach(function(contact) {
        arr.push(Contact.save(contact).$promise);
      });
        $q.all(arr).then(function(contacts) {
          console.log(contacts);
          student.contacts = contacts.map(function(contact) {return contact._id});
          console.log(student.contacts);
          studentArr.push(Student.save(student).$promise);
        });
     });
      $q.all(studentArr).then(function(students) {
        console.log(students);
      });
     // console.log($scope.classroom.students);
    };

    $scope.deleteStudent = function(studentId) {
      $scope.classroom.students.forEach(function(student, i) {
        if(student._id === studentId) {
          // Student.get({id: student._id}, function(student) {
          //   student.contacts.forEach(function(contact) {
          //     Contact.delete({id: contact._id});
          //   });
          // });
          // Student.delete({id: student._id});
          $scope.classroom.students.splice(i,1);
        }
      });
    };
  });
