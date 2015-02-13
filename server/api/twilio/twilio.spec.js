'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Contact = require('../contact/contact.model');
var User = require('../user/user.model');
var Conversation = require('../conversation/conversation.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password',
  phone: '+18563515245'
});

var contact = new Contact({
  name: 'Edmund Pierce',
  phone: '+130205984900'
});

describe('Twilio Call', function() {
  before(function(done) {
    // Clear students before testing
    User.remove().exec().then(function() {
      done();
    });
    Contact.remove().exec().then(function() {
      done();
    });
    user.save();
    contact.save();
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
    Contact.remove().exec().then(function() {
      done();
    });
  });

  describe('find conversation', function() {
    it('should require a first name', function(done) {
      User.findOne({phone: '+18563515245'}, function(err, user) {
        console.log(user);
        Contact.findOne({phone: '+130205984900'}, function(err, contact) {
          console.log(contact);
          var conversation = new Conversation({
            userId: user._id,
            contactId: contact._id,
            messages: [],
            // unreadMessages: false
          });
          var newMessage = {
            body: "yo this is a text message",
            dateSent: new Date(),
            type: 'received'
          };
          conversation.save(function(err) {
            Conversation.findOne({userId: user._id, contactId: contact._id}, function(err, conversation2) {
              console.log('found conversation', conversation2);
              conversation2.messages.push(newMessage);
              // conversation2.unreadMessages = true;
              conversation2.save(function(err, conversation3) {
              console.log('saved conversation', conversation3);
              done();
            });
          });

      });
    });
  });
      });
    });


});
