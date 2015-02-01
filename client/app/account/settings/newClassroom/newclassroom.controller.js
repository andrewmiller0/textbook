'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Classroom) {
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
      $scope.currentStudent.contacts.push($scope.currentContact);
      $scope.currentContact = {
        name: "",
        number: ""
      };
    };

    $scope.addStudent = function() {
      $scope.studentSubmitted = true;
      if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
         $scope.classroom.students.push($scope.currentStudent);
         $scope.currentStudent = {
          firstName: "",
          lastName: "",
          contacts: []
         };
      }
      
    };

    $scope.addClassroom = function() {
      $scope.submitted = true;
      if (form.$valid) Classroom.save($scope.classroom);
    };

  });
