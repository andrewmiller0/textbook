'use strict';

angular.module('textbookApp')
  .factory('SchedMsg', function ($resource) {
    return $resource('/api/schedmsgs/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
