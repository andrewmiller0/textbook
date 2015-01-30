'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('../user/user.model'),
	Contact = require('../contact/contact.model');

var types = ['sent', 'received'];

var MessageSchema = new Schema({
	body: String,
	dateSent: Date,
	type: {type: String, enum: types}
})

var ConversationSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  contactId: {type: Schema.Types.ObjectId, ref: 'Contact'},
  messages: {type: [MessageSchema]}, // this is how we did it in stackstore but idk
  unreadMessages: Boolean
});

ConversationSchema.virtual('updated').get(function() {
	var sorted = this.messages.sort(function(a,b) {
		if (a.dateSent > b.dateSent) return -1;
		if (a.dateSent < b.dateSent) return 1;
		return 0;
	});

	return {
		'updated': sorted[0].dateSent
	}
});

module.exports = mongoose.model('Conversation', ConversationSchema);