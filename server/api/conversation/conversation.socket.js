/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Conversation = require('./conversation.model'),
	User = require('../user/user.model');

exports.register = function(socket) {
  Conversation.schema.post('save', function (convo) {
	onSave(socket, convo);
  });
  Conversation.schema.post('remove', function (doc) {
	onRemove(socket, doc);
  });
}

function onSave(socket, convo, cb) {
	User.findById(convo.userId, function(err, user) {
		console.log(user.id, socket.decoded_token._id);
		if (user.id == socket.decoded_token._id) {
		  socket.emit('conversation:save', convo);
		}
	})
}

function onRemove(socket, doc, cb) {
  socket.emit('conversation:remove', doc);
}