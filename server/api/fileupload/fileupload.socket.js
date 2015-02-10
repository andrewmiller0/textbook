/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Fileupload = require('./fileupload.model');

exports.register = function(socket) {
  Fileupload.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Fileupload.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('fileupload:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('fileupload:remove', doc);
}