'use strict';

var User = require('./user.model');

exports.register = function(socket) {
  User.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  User.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  User.schema.put('save', function (doc) {
    onSave(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('user:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('user:remove', doc);
}

// function onUpdate(socket, doc, cb) {
//   socket.emit('student:update', doc);
// }