'use strict';

angular.module('textbookApp')
  .directive('fileread', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the fileread directive');
      }
    };
  });