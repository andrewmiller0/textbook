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
      },
      addHomework:{
        method: 'POST',
        params: {
          controller: 'homework'
        }
      },
      deleteHomework:{
        method: 'POST',
        params:{
          controller: 'homeworkdelete'
        }
      }
    });

    return Classroom;
  });
