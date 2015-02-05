'use strict';

angular.module('textbookApp')
  .filter('tel', function () {
    return function (tel) {
      if (!tel) { return ''; }

      var city, number;
      if(tel.length === 10) {
      	city = tel.slice(0,3);
      	number = tel.slice(3,6) + '-' + tel.slice(6);
      } else {
      city = tel.slice(2,5);
      number = tel.slice(5,8) + '-' + tel.slice(8);	
      }
      return ' (' + city + ') ' + number;
    };
  });
