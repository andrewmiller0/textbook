'use strict';
var config = require('../config/environment');
var accountSid = config.twilio.clientID;
var authToken = config.twilio.clientToken;
var client = require('twilio')(accountSid, authToken);

var Sms = function(obj){
	this.body = obj.body;
	this.to = obj.to;
	this.from = obj.from
}

Sms.prototype.send = function(cb){
	var self = this;
	client.messages.create(this, function(err, message){
		if(err) console.log(err);
		if(message.errorMessage === null){
			var retMsg = {
				body: self.body,
				dateSent: new Date(),
				type:'sent'
			}
			return cb(retMsg);
		}
	});
}

module.exports = Sms;
