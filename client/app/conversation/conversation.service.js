'use strict';

angular.module('textbookApp')
    .factory('Conversation', function ($resource) {
    var Conversation = $resource('/api/conversations/:id', { id: '@_id' }, {
      update: {
        method: 'PUT',
      },
      sendMsg: {
        method:'POST'
      },
      getConversation: {
        method: 'POST'
      }
    });
    return Conversation;
  });
