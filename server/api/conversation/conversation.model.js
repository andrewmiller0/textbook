'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Conversation', ConversationSchema);