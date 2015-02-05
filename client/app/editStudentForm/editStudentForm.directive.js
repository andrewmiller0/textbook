'use strict';

angular.module('textbookApp')
  .directive('editStudentForm', function (Contact, Student) {
    return {
      templateUrl: 'app/editStudentForm/editStudentForm.html',
      restrict: 'EA',
      scope: {
      	currentStudent: '=curr'
      },
      link: function (scope, element, attrs) {
	  	scope.addContact = function() {
	      scope.currentStudent.primaryPhone = scope.currentContact.phone;
	      Contact.save(scope.currentContact, function(contact) {
	          scope.currentStudent.contacts.push(contact);
	      });
	      scope.currentContact = {
	        name: "",
	        relationship: "",
	        phone: ""
	      };
	      scope.show = false;
	    };
	},
	controller: function($scope, Contact, Student) {
		$scope.editView;
		$scope.showEdit = function(contactId) {
			if($scope.editView === contactId) {
				$scope.editView = '';
			} else {
				$scope.editView = contactId;	
			}
		};
	    $scope.saveStudent = function() {
	      if ($scope.currentStudent.firstName.length && $scope.currentStudent.lastName.length && $scope.currentStudent.contacts.length) {
	         var studentToUpdate = _.clone($scope.currentStudent);
	         studentToUpdate.contacts = studentToUpdate.contacts.map(function(contact) {return contact._id});
	         Student.update(studentToUpdate, function(student) {
	         	console.log(student);
	         });
	      }
	    };

	    $scope.deleteContact = function(contactId) {
	    	$scope.currentStudent.contacts.forEach(function(contact, i) {
	    		if(contact._id === contactId) {
	    			Contact.delete({id: contact._id});
	    			$scope.currentStudent.contacts.splice(i, 1);
	    		}	
	    	})
	    };
	    $scope.$on('close editview', function(event, data) {
	    	$scope.editView = '';
	    });
      }
	}
  })