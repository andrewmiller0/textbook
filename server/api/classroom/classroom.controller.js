'use strict';

var _ = require('lodash');
var Classroom = require('./classroom.model');
var Student = require('../student/student.model');
var Contact = require('../contact/contact.model');
var User = require('../user/user.model');
var async = require('async');

// Get list of classrooms
exports.index = function(req, res) {
  Classroom.find(function (err, classrooms) {
    if(err) { return handleError(res, err); }
    return res.json(200, classrooms);
  });
};

// Get a single classroom
exports.show = function(req, res, next) {
  Classroom.findById(req.params.id, function (err, classroom) {
    if(err) { return handleError(res, err); }
    if(!classroom) { return res.send(404); }
  })
  .populate('students')
  .exec(function(err, classroom) {
    if (err) return next(err);
      res.json(classroom);
    });
};

exports.getUnpopulated = function(req, res) {
  Classroom.findById(req.params.id, function (err, classroom) {
    if(err) { return handleError(res, err); }
    if(!classroom) { return res.send(404); }
    return res.json(classroom);
  })
}

// Creates a new classroom in the DB.
exports.create = function(req, res) {
  Classroom.create(req.body, function(err, classroom) {
    if(err) { return handleError(res, err); }
    return res.json(201, classroom);
  });
};

// Updates an existing classroom in the DB.
exports.update = function(req, res) {
  if(req.body._id) { 
    delete req.body._id;
    delete req.body.__v; 
  }
  Classroom.findById(req.params.id, function (err, classroom) {
    if (err) { return handleError(res, err); }
    if(!classroom) { return res.send(404); }
    _.assign(classroom, req.body);
    classroom.markModified('students');
    classroom.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, classroom);
    });
  });
};

// Deletes a classroom from the DB.
exports.destroy = function(req, res) {
  Classroom.findById(req.params.id, function (err, classroom) {
    if(err) { return handleError(res, err); }
    if(!classroom) { return res.send(404); }
    classroom.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.saveSpreadsheet = function(req, res) {
  if(req.body._id) { 
    delete req.body._id;
    delete req.body.__v; 
  }
  var studentArr = [];
  console.log(req.body.length);
  req.body.forEach(function(obj) {
    var newContact = {
      name: obj.name,
      phone: obj.phone
    };
    var newStudent = {
      firstName: obj.firstName,
      lastName: obj.lastName, 
      primaryPhone: obj.phone,
      contacts: []
    }

    async.series([
        function(callback) {
          Contact.create(newContact, function(err, contact) {
            if (err) { return handleError(res, err); }
            contact.createConversation(req.user._id, contact._id);
            newStudent.contacts.push(contact._id);
            callback(null);
          });
        },
        function(callback) {
          Student.create(newStudent, function(err, student) {
            if (err) { return handleError(res, err); }
            callback(null, student._id);
          });
        }
      ], function(err, results) {
        console.log(studentArr.length);
        studentArr.push(results[1]);
        if(studentArr.length === req.body.length) {
          Classroom.findById(req.params.id, function (err, classroom) {
            // console.log("these are the students", studentArr);
            if (err) { return handleError(res, err); }
            classroom.students = studentArr;
            classroom.markModified('students');
            classroom.save(function(err) {
              if(err) { return handleError(res, err); }
              User.findById(req.user._id, function(err, user) {
                if(err) { return handleError(res, err); }
                return res.json(200, user);
              });
          });
        });
        }
      });
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
