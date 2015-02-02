'use strict';

angular.module('textbookApp')
  .filter('tel', function () {
    return function (tel) {
      if (!tel) { return ''; }

      var city, number;

      city = tel.slice(2,5);
      number = tel.slice(5,8) + '-' + tel.slice(8);
      return ' (' + city + ') ' + number;
    };
  });
