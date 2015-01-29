/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Conversation = require('./conversation.model');

exports.register = function(socket) {
  Conversation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Conversation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('conversation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('conversation:remove', doc);
}