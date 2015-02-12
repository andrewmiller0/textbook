'use strict';

angular.module('textbookApp')
  .directive('editContact', function () {
    return {
      templateUrl: 'app/directives/editContact/editContact.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })
  .controller('editContactController', function($scope, Contact) {
  	$scope.editContact = function(contactId) {
      $scope.editFormSubmit = true;
      if($scope.editContactForm.$valid) {
    		Contact.update({id: contactId}, $scope.contact, function(contactSaved) {
    			console.log(contactSaved);
          $scope.currentStudent.contacts.forEach(function(contact, i) {
            if(contact._id === contactId) {
              $scope.currentStudent.contacts[i] = contactSaved;
            }
          });
    			$scope.$emit('close addeditview');
          $scope.$emit('close editview');
    		});
      }
  	};


  });