'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Classroom', ClassroomSchema);