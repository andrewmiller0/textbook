'use strict';

angular.module('textbookApp')
  .factory('Student', function ($resource) {
    // Service logic
    // ...

    var Student = $resource('/api/students/:id', {id: '@_id'} {
      update: {
        method: 'PUT'
      }
    })
  });
