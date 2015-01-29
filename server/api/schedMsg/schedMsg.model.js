'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchedMsgSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('SchedMsg', SchedMsgSchema);