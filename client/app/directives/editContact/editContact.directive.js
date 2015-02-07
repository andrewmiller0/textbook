'use strict';

angular.module('textbookApp')
  .directive('editContact', function () {
    return {
      templateUrl: 'app/account/settings/newClassroom/editContact/editContact.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })
  .controller('editContactController', function($scope, Contact) {
  	$scope.editContact = function(contactId) {
  		Contact.update({id: contactId}, $scope.contact, function(contactSaved) {
  			console.log(contactSaved);
  			$scope.addEditView = false;
  			$scope.$emit('close addeditview');
        $scope.$emit('close editview');

  		});
  	}


  });