	var express = require('express'),
	twilio = require('twilio'),
	config = require('../../config/environment'),
	Conversation = require('../conversation/conversation.model'),
	User = require('../user/user.model'),
	Contact = require('../contact/contact.model')

module.exports = function(req, res) {
	console.log(req.body);
	var text = req.body;
	// if (twilio.validateExpressRequest(req, config.twilio.clientToken, {url: config.twilio.smsWebhook})) {
	// 	console.log(req.body);
	// 	res.header('Content-Type', 'text/xml');
 //        var body = req.param('Body').trim();
 //        console.log(body);
 //        res.send(200);
	// }
	var newMessage = {
		body: text.Body,
		dateSent: new Date(),
		type: 'received'
	};
	User.findOne({phone: text.To}, function(err, user) {
		Contact.findOne({phone: text.From}, function(err, contact) {
			if (err) return err;
			if (!contact) {
				Contact.create({
					phone: text.From
				}, function(err, contact) {
					if (err) return err;
					contact.createConversation(user._id, contact._id, newMessage);
					return contact;
				});
			}
			else {
				Conversation.findOne({userId: user._id, contactId: contact._id}, function(err, conversation) {
					if (err) return err;
					conversation.messages.push(newMessage);
					conversation.unreadMessages++;
					conversation.save(function(err, conversation2) {
						return conversation2;
					});
				});
			}
		});
	});
};