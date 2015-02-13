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
	  			console.log('hit')
	  			console.log($scope.contactForm.$valid);
		  	  $scope.contactFormSubmit = true;
	      	  if($scope.contactForm.$valid) {
			      Contact.save($scope.currentContact, function(contact) {
			          $scope.currentStudent.contacts.push(contact);
			          var studentToUpdate = _.clone($scope.currentStudent);
			          studentToUpdate.contacts = studentToUpdate.contacts.map(function(contact) {return contact._id});
			          Student.update(studentToUpdate, function(student) {
			         	console.log(student);
			         });
			      });
			      $scope.currentContact = {
			        name: "",
			        relationship: "",
			        phone: ""
			      };
			      $scope.show = false;
			      $scope.contactFormSubmit = false;
		  	  }
		    };
    	}
	};
  });