'use strict';

angular.module('textbookApp')
  .directive('studentForm', function () {
    return {
      templateUrl: 'app/account/settings/addClassroom/studentForm/studentForm.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });