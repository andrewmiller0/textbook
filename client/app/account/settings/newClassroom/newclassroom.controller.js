'use strict';

angular.module('textbookApp')
  .controller('NewClassCtrl', function ($scope, $location, Auth, Classroom, Student, Contact, User) {
    $scope.user = Auth.getCurrentUser();
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
      if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
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
      Classroom.save($scope.classroom, function(classroom) {
        $scope.user.classrooms.push(classroom._id);
        $scope.user.blah = "hi";
        console.log($scope.user);
        User.update($scope.user);
      });
    };

  });
