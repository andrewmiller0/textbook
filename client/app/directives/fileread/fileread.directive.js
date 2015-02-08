'use strict';

angular.module('textbookApp')
  .directive('fileread', function () {
    return {
      scope: {
      	fileread: '='
      },
      link: function (scope, element, attrs) {
        element.bind('change', function(changeEvent) {
        	console.log(changeEvent);
        	var reader = new FileReader();
        	reader.onload = function(loadEvent) {
        		console.log(loadEvent.target.result);
        		scope.$apply(function() {
        			scope.fileread = loadEvent.target.result;
        		});
        	}
        	reader.readAsDataURL(changeEvent.target.files[0]);
        })
      }
    };
  });