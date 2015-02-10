'use strict';

angular.module('textbookApp')
  .directive('contactList', function () {
    return {
      templateUrl: 'app/directives/contactList/contactList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });