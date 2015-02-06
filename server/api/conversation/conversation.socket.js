/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Conversation = require('./conversation.model');

exports.register = function(socket) {
	// console.log(socket);
  Conversation.schema.post('save', function (convo) {
    onSave(socket, convo);
  });
  Conversation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, convo, cb) {
	console.log(convo.userId.id);
	if (convo.userId.id == socket.decoded_token._id) {
	  socket.emit('conversation:save', convo);
	}
}

function onRemove(socket, doc, cb) {
  socket.emit('conversation:remove', doc);
}