/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Classroom = require('../api/classroom/classroom.model');
var Conversation = require('../api/conversation/conversation.model');
var Contact = require('../api/contact/contact.model');
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
      // User.findOne({name: 'Test User'}, function(err, user) {
      //   console.log(user);
      //   Classroom.findOne({name: 'Math'}, function(err, classroom) {
      //     user.classrooms.push(classroom._id);
      //     user.save();
      //   });
      // });
    }
  );
});

Classroom.find({}).remove(function() {
});

Conversation.find({}).remove(function() {
});

Contact.find({}).remove(function() {
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