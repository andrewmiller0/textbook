'use strict';

angular.module('textbookApp')
  .factory('contact', function () {
      var Contact = $resource('/api/contacts/:id', {id: '@_id'} {
        update: {
          method: 'PUT'
        }
      });
    };
  });
