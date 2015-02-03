var express = require('express'),
	twilio = require('twilio'),
	config = require('../../config/environment');

module.exports = function(req, res) {
	console.log(req.body);
	if (twilio.validateExpressRequest(req, config.twilio.clientToken, {url: config.twilio.smsWebhook})) {
		console.log(req.body);
		res.header('Content-Type', 'text/xml');
        var body = req.param('Body').trim();
        console.log(body);
        res.send(200);
	}
};