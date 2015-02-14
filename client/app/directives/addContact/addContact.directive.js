'use strict';

angular.module('textbookApp')
  .directive('addContact', function () {
    return {
      templateUrl: 'app/directives/addContact/addContact.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      },
	  controller: function($scope, Contact, Student) {
	  		$scope.addContact = function() {
		  	  $scope.contactFormSubmit = true;
	      	  if($scope.contactForm.$valid) {
	      	  	var primary = _.find($scope.currentStudent.contacts, {primary: true});
	      	  	console.log(primary);
	      	  	if (!primary) {
	      	  		$scope.currentContact.primary = true;
	      	  	}
			      Contact.save($scope.currentContact, function(contact) {
			          $scope.currentStudent.contacts.push(contact);
			          var studentToUpdate = _.clone($scope.currentStudent);
			          console.log(studentToUpdate);
			          studentToUpdate.contacts = studentToUpdate.contacts.map(function(contact) {return contact._id});
			          Student.update(studentToUpdate, function(student) {
			         	console.log(student);
			         });
			      });
			      $scope.currentContact = {
			        name: "",
			        relationship: "",
			        phone: "",
			        primary: false
			      };
			      $scope.show = false;
			      $scope.contactFormSubmit = false;
		  	  }
		    };
    	}
	};
  });