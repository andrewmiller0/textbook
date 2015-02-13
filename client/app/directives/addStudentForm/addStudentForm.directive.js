'use strict';

angular.module('textbookApp')
  .directive('studentForm', function () {
    return {
      templateUrl: 'app/directives/addStudentForm/addStudentForm.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })
  .controller('studentFormController', function($scope, Student, Contact, Classroom) {
  	$scope.currentStudent = {
      firstName: "",
      lastName: "",
      primaryPhone: "",
      contacts: [{
        name: "",
        relationship: "",
        phone: ""
      }]
    };
    console.log($scope.currentStudent);
    $scope.currentContact = {
      name: "",
      relationship: "",
      phone: ""
    };

    $scope.addStudent = function() {
        $scope.studentFormSubmit = true;
        if($scope.studentForm.$valid) {
         $scope.studentAdded = true;
         $scope.currentStudent.primaryPhone = $scope.currentStudent.contacts[0].phone;
         $scope.currentStudent.contacts[0].phone = '+1' + $scope.currentStudent.contacts[0].phone;
         var studentToSave = angular.copy($scope.currentStudent);
         Contact.save($scope.currentStudent.contacts[0], function(contact) {
           $scope.currentStudent.contacts[0]._id = contact._id;
           $scope.classroom.students.push($scope.currentStudent);
           studentToSave.contacts[0] = contact._id;

           Student.save(studentToSave, function(student) {
              $scope.classroom.students[$scope.classroom.students.length - 1]._id = student._id;
           });
        });
         $scope.studentFormSubmit = false;
       }
    };

    $scope.resetStudent = function() {
      var classroomToSave = angular.copy($scope.classroom);
      classroomToSave.students = classroomToSave.students.map(function(student){return student._id});
      Classroom.update(classroomToSave);
      $scope.currentStudent = {
        firstName: "",
        lastName: "",
        primaryPhone: "",
        contacts: [{
          name: "",
          relationship: "",
          phone: ""
        }]
       };
      $scope.studentAdded = false;
    }

    $scope.deleteContact = function(contactId) {
        $scope.currentStudent.contacts.forEach(function(contact, i) {
          if(contact._id === contactId) {
            Contact.delete({id: contact._id});
            $scope.currentStudent.contacts.splice(i, 1);
          }
        });
        if($scope.addEditView) $scope.addEditView = '';
      };


    $scope.addEditView = "";
    $scope.addShowEdit = function(contactId) {
      if($scope.addEditView === contactId) {
        $scope.addEditView = '';
      } else {
        $scope.addEditView = contactId;
      }
    };

      $scope.$on('close editview', function(event, data) {
        $scope.addEditView = '';
      });

  });
