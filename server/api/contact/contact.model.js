'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Conversation = require('../conversation/conversation.model');

var ContactSchema = new Schema({
  name: String,
  relationship: String,
  phone: String
});

ContactSchema.methods.createConversation = function(userId, contactId) {
		console.log('hello!');
		Conversation.create({
		  userId: userId,
		  contactId: contactId,
		  messages: [],
		  unreadMessages: false
		}, function(err, conversation) {
			if(err) return err;
			else return conversation;
		});
	}

module.exports = mongoose.model('Contact', ContactSchema);