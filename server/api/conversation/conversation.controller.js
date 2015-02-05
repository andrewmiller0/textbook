'use strict';

var _ = require('lodash');
var Conversation = require('./conversation.model');
var config = require('../../config/environment');

// Get list of conversations
exports.index = function(req, res) {
  Conversation.find(function (err, conversations) {
    if(err) { return handleError(res, err); }
    return res.json(200, conversations);
  });
};

// Get a single conversation
exports.show = function(req, res) {
  Conversation.findById(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    return res.json(conversation);
  });
};

exports.sendMsg = function(req, res) {

  var accountSid = config.twilio.clientID;
  var authToken = config.twilio.clientToken;
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
      body: req.body.message,
      to: "+1" + req.body.to,
      from: req.body.from
  }, function(err, message) {
      console.log(message);
      if(err) console.log(err);

  });
}
// Creates a new conversation in the DB.
exports.create = function(req, res) {
  Conversation.create(req.body, function(err, conversation) {
    if(err) { return handleError(res, err); }
    return res.json(201, conversation);
  });
};

exports.getOne = function(req, res) {
  Conversation.find({userId: req.body.userId, contactId: req.body.contactId}, function(err, data){
    if(err) console.log(err);
    res.send({data: data});
  })
}

// Updates an existing conversation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Conversation.findById(req.params.id, function (err, conversation) {
    if (err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    var updated = _.merge(conversation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, conversation);
    });
  });
};

// Deletes a conversation from the DB.
exports.destroy = function(req, res) {
  Conversation.findById(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    conversation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
