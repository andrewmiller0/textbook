/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var config = require('./environment');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// var accountSid = config.twilio.clientID;
// var authToken = config.twilio.clientToken;
// var client = require('twilio')(accountSid, authToken);
 
// client.messages.create({
//     body: "Hey Chuck!",
//     to: "+13025984900",
//     from: "+18563515245"
// }, function(err, message) {
//     process.stdout.write(message.sid);
// });