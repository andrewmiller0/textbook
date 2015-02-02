'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Classroom, Student, Contact) {
    $scope.classroom = {
      students: []
    };
    $scope.currentStudent = {
      firstName: "",
      lastName: "",
      primaryPhone: "",
      contacts: []
    };
    $scope.currentContact = {
      name: "",
      phone: ""
    };

    $scope.addContact = function() {
      $scope.contactSubmiited = true;
      $scope.currentStudent.primaryPhone = $scope.currentContact.phone;
      // $scope.currentStudent.contacts.push($scope.currentContact);
      Contact.save($scope.currentContact, function(contact) {
        $scope.currentStudent.contacts.push(contact._id);
      });
      $scope.currentContact = {
        name: "",
        phone: ""
      };
    };

    $scope.addStudent = function() {
      $scope.studentSubmitted = true;
      $scope.displayClassroom.push($scope.currentStudent);
      if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
         // $scope.classroom.students.push($scope.currentStudent);
         Student.save($scope.currentStudent, function(student) {
          $scope.classroom.students.push(student._id)
         });

         $scope.currentStudent = {
          firstName: "",
          lastName: "",
          primaryPhone: "",
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
