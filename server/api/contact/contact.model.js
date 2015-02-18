'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Conversation = require('../conversation/conversation.model');

var ContactSchema = new Schema({
  name: String,
  relationship: String,
  phone: String,
  primary: Boolean
});

ContactSchema.methods.createConversation = function(userId, contactId, message) {
		var arr = [];
		if (message) arr.push(message);
		Conversation.create({
		  userId: userId,
		  contactId: contactId,
		  messages: arr,
		  unreadMessages: 0
		}, function(err, conversation) {
			if(err) { return err; }
			else {
				console.log(conversation.contactId);
				return conversation;
			}
		});
	};

// ContactSchema.pre('save', function(next) {
// 	if(this.phone.indexOf('+1') === -1) {
// 		this.phone = '+1' + this.phone;
// 	}
// 	next();
// })

module.exports = mongoose.model('Contact', ContactSchema);