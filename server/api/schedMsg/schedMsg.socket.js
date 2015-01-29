/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var SchedMsg = require('./schedMsg.model');

exports.register = function(socket) {
  SchedMsg.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  SchedMsg.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('schedMsg:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('schedMsg:remove', doc);
}