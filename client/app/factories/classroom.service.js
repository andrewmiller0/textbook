'use strict';

angular.module('textbookApp')
  .factory('Classroom', function ($resource) {
    var Classroom = $resource('/api/classrooms/:id/:controller', { id: '@_id' }, {
      getUnpopulated: {
        method: 'GET',
        params: {
          controller: 'unpopulated'
        }
      },
      update: {
        method: 'PUT'
      }
    });

    return Classroom;
  });
