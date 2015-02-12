'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Student = require('../student/student.model');

var ClassroomSchema = new Schema({
  name: String,
  students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  homework:[String]
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
