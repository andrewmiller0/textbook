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
        url: '/api/conversations/:userId/:contactId',
        method: 'GET'
      }
    });

    Conversation.unread = {};
    
    return Conversation;
  });
