'use strict';

angular.module('textbookApp')
  .directive('conversation', function () {
    return {
      templateUrl: 'app/main/conversation/conversation.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });