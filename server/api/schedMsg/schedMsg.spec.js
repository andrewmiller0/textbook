'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var SchedMsg = require('./schedMsg.model');
var User = require('../user/user.model');

var id;
var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});
var d = new Date();
var schedMsg = new SchedMsg({
  scheduleTime: d,
  body: "this is a body"
});

describe('schedMsg Model', function() {

   before(function(done) {
    // Clear schedmsgs before testing
    SchedMsg.remove().exec().then(function() {
      user.save(function(err, user) {
        console.log(user._id);
        id = user._id;
      });
      done();
    });
  });

  afterEach(function(done) {
    SchedMsg.remove().exec().then(function() {
      User.remove().exec().then(function() {
        done();
      });
    });
  });

  describe('Schema', function() {
    it('requires a body', function(done) {
      schedMsg.userId = id;
      schedMsg.body = '';
      schedMsg.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('requires a scheduled time', function(done) {
      schedMsg.userId = id;
      schedMsg.body = 'hi';
      schedMsg.scheduleTime = '';
      schedMsg.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('requires a user Id', function(done) {
      schedMsg.userId = '';
      schedMsg.scheduleTime = d;
      schedMsg.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('GET /api/schedMsgs', function() {

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/schedMsgs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});

