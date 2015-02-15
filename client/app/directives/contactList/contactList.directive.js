'use strict';

angular.module('textbookApp')
  .directive('contactList', function () {
    return {
      templateUrl: 'app/directives/contactList/contactList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      },
      controller: function($scope) {
      	$scope.studentFilter = function(kid) {
			var condition = new RegExp($scope.term, 'i');
			return (condition.test(kid.firstName) || condition.test(kid.lastName));
		};
      }
  	};
  });