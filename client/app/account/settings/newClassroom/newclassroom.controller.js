'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Classroom, Student) {
    $scope.classroom = {
      students: []
    };
    $scope.currentStudent = {
      firstName: "",
      lastName: "",
      contacts: []
    };
    $scope.currentContact = {
      name: "",
      number: ""
    };

    $scope.addContact = function() {
      $scope.contactSubmiited = true;
      // $scope.currentStudent.contacts.push($scope.currentContact);
      Contact.save($scope.currentContact, function(contact) {
        console.log(contact);
      })
      $scope.currentContact = {
        name: "",
        number: ""
      };
    };

    $scope.addStudent = function() {
      $scope.studentSubmitted = true;
      if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
         // $scope.classroom.students.push($scope.currentStudent);
         // Student.save($scope.currentStudent, function(student) {
         //  console.log(student);
         // });

         $scope.currentStudent = {
          firstName: "",
          lastName: "",
          contacts: []
         };
      }
      
    };

    $scope.addClassroom = function() {
      $scope.submitted = true;
      Classroom.save($scope.classroom);
      console.log("is this even happening");
    };

  });
