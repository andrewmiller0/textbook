'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Contact = require('./contact.model');

var contact = new Contact({
  name: 'Dude Man',
  phone: 3025984900,
  relationship: 'Father'
});

describe('contact Model', function() {
  before(function(done) {
    // Clear contacts before testing
    Contact.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Contact.remove().exec().then(function() {
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/contacts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });

  });

  it('should attach +1 to phone number if it doesn\'t already exist', function(done) {
    contact.save(function(err) {
      contact.phone.indexOf('+1').should.eql(0);
      done();
    });
  });
    it('should not attached +1 to phone number if it exists', function(done) {
    contact.phone = '+13025984900';
    contact.save(function(err) {
      contact.phone.indexOf('+1').should.eql(0);
      contact.phone.indexOf('+1+1').should.eql(-1);
      done();
    });
  });

});