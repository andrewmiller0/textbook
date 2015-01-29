'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Student = require('../student/student.model'),
    User = require('../user/user.model'),
    Classroom = require('../classroom/classroom.model');

var SchedMsgSchema = new Schema({
  scheduleTime: {type: Date, required: true},
  body: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
  students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
});

module.exports = mongoose.model('SchedMsg', SchedMsgSchema);