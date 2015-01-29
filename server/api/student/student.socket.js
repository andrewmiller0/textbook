/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Student = require('./student.model');

exports.register = function(socket) {
  Student.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Student.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('student:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('student:remove', doc);
}