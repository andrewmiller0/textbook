var express = require('express'),
	twilio = require('twilio'),
	config = require('../../config/environment'),
	Conversation = require('../conversation/conversation.model'),
	User = require('../user/user.model'),
	Contact = require('../contact/contact.model')

module.exports = function(req, res) {
	console.log(req.body);
	// if (twilio.validateExpressRequest(req, config.twilio.clientToken, {url: config.twilio.smsWebhook})) {
	// 	console.log(req.body);
	// 	res.header('Content-Type', 'text/xml');
 //        var body = req.param('Body').trim();
 //        console.log(body);
 //        res.send(200);
	// }
	User.findOne({phone: req.body.To}, function(err, user) {
		Contact.findOne({phone: req.body.From}, function(err, contact) {
			Conversation.findOne({userId: user._id, contactId: contact._id}, function(err, conversation) {
				console.log(conversation);
			})
		})
	});
	res.send(200);

};