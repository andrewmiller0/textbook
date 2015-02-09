var express = require('express'),
	twilio = require('twilio'),
	config = require('../../config/environment'),
	Conversation = require('../conversation/conversation.model'),
	User = require('../user/user.model'),
	Contact = require('../contact/contact.model'),
	Student = require('../student/student.model');

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
					conversation.unreadMessages = true;
					if(newMessage.body.toLowerCase() === 'homework'){
						user.deepPopulate('classrooms.students.contacts', function(err) {
							if (err) return next(err);
							var retArr = [];
							console.log("", user.classrooms[0].students); //[{"_id":"54d4f047f5d3e3b305d17944","firstName":"Tom","lastName":"Tom","primaryPhone":"+15514043092","__v":0,"contacts":[{"_id":"54d4f046f5d3e3b305d17942","name":"mom","relationship":"mom","phone":"+15514043092","__v":0}]}]
							user.classrooms.forEach(function(classroom){
								classroom.students.forEach(function(student){
									student.contacts.forEach(function(contact){
										if(contact.phone === text.From){
											var homework = {
												class:classroom.name,
												homework: classroom.homework,
											};
											retArr.push(homework);
											homework = {};
										}
									});
								});
							});
							retArr.forEach(function(homework){
								var messageBody = homework.class + " Homework: %0a" + homework.homework.join('%0a');
								console.log(messageBody);
								Conversation.sendMsg({body: messageBody, to: text.From, from:text.To}, function(message){
									res.json(200, message);
								});

							});
						});
					}
					conversation.save(function(err, conversation2) {
						return conversation2;
					});
				});
			}
		});
	});
};
