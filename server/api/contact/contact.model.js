'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Conversation = require('../conversation/conversation.model');

var ContactSchema = new Schema({
  name: String,
  relationship: String,
  phone: String
});

ContactSchema.methods.createConversation = function(userId, contactId, message) {
		var arr = [];
		if (message) arr.push(message);
		Conversation.create({
		  userId: userId,
		  contactId: contactId,
		  messages: arr,
		  unreadMessages: false
		}, function(err, conversation) {
			if(err) { return err; }
			else {
				console.log(conversation.contactId);
				return conversation;
			}
		});
	}

module.exports = mongoose.model('Contact', ContactSchema);