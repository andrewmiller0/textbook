'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Student = require('./student.model');

var student = new Student({
  firstName: 'Chuck',
  lastName: 'Man',
  parentFirstName: 'Parent',
  parentLastName: 'Name',
  phoneNumber: 1234567890,
});

describe('Student Model', function() {
  before(function(done) {
    // Clear users before testing
    Student.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Student.remove().exec().then(function() {
      done();
    });
  });

  describe('Schema', function() {
    it('should require a first name', function(done) {
      student.firstName = '';
      student.save(function(err) {
        should.exist(err);
        done();
      })
    });
    it('should require a last name', function(done) {
      student.lastName = '';
      student.save(function(err) {
        should.exist(err);
        done();
      })
    });
     it('should require a parent first name', function(done) {
      student.parentFirstName = '';
      student.save(function(err) {
        should.exist(err);
        done();
      })
    });
     it('should require a parent last name', function(done) {
      student.parentLastName = '';
      student.save(function(err) {
        should.exist(err);
        done();
      })
    });
     it('should require a phone number', function(done) {
      student.phoneNumber = '';
      student.save(function(err) {
        should.exist(err);
        done();
      })
    });
  });


  describe('GET /api/students', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/students')
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