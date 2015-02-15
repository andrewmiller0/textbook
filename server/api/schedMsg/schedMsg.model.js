'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Student = require('../student/student.model'),
    User = require('../user/user.model'),
    Classroom = require('../classroom/classroom.model');

var SchedMsgSchema = new Schema({
  scheduleTime: {type: Date, required: true},
  body: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  to: Array // this should have some validation but i just can't
  // classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
});

SchedMsgSchema
	.path('scheduleTime')
	.validate(function(value, respond) {
		if (new Date() > value) return respond(false);
		respond(true);
	}, 'Invalid date.');

module.exports = mongoose.model('SchedMsg', SchedMsgSchema);