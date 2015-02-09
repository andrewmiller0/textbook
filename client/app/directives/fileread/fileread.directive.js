'use strict';

angular.module('textbookApp')
  .directive('fileread',[ '$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('change', function(changeEvent) {
        	$parse(attrs.fileread)
        	.assign(scope, element[0].files[0])
        	scope.$apply();
        });
      }
    };
  }]);