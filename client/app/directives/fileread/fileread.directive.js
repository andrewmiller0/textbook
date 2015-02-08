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
        	scope.$apply(function() {
        		scope.fileread = changeEvent.target.files[0];
        	})
        	// var reader = new FileReader();
        	// reader.onload = function(loadEvent) {
        	// 	console.log(loadEvent);
        	// 	scope.$apply(function() {
        	// 		scope.fileread = loadEvent.target.result;
        	// 	});
        	// }
        	// reader.readAsDataURL(changeEvent.target.result);
        })
      }
    };
  });