'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Contact = require('../contact/contact.model');

var StudentSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
});

StudentSchema
.virtual('fullName')
.get(function() {
	return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('Student', StudentSchema);