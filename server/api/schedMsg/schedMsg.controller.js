'use strict';

var _ = require('lodash'),
    cronJob = require('cron').CronJob;
var SchedMsg = require('./schedMsg.model'),
    conversationRoute = require('../conversation/conversation.controller');
var Sms = require('../../remotes/sms');

// Get list of schedMsgs
exports.index = function(req, res) {
  SchedMsg.find(function (err, schedMsgs) {
    if(err) { return handleError(res, err); }
    return res.json(200, schedMsgs);
  });
};

// Get a single schedMsg
exports.show = function(req, res) {
  SchedMsg.findById(req.params.id, function (err, schedMsg) {
    if(err) { return handleError(res, err); }
    if(!schedMsg) { return res.send(404); }
    return res.json(schedMsg);
  });
};

// Creates a new schedMsg in the DB.
exports.create = function(req, res) {
  var date = new Date(req.body.date);
  var toSave = {
    scheduleTime: date,
    body: req.body.body,
    userId: req.body.userId,
    to: req.body.to
  };
  SchedMsg.create(toSave, function(err, schedMsg) {
    if(err) { return handleError(res, err); }
    var textJob = new cronJob(date, function(){
      conversationRoute.sendMultiple(req, res);
    }, null, true);
    return res.json(201, schedMsg);
  });
};

// Updates an existing schedMsg in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SchedMsg.findById(req.params.id, function (err, schedMsg) {
    if (err) { return handleError(res, err); }
    if(!schedMsg) { return res.send(404); }
    var updated = _.merge(schedMsg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, schedMsg);
    });
  });
};

// Deletes a schedMsg from the DB.
exports.destroy = function(req, res) {
  SchedMsg.findById(req.params.id, function (err, schedMsg) {
    if(err) { return handleError(res, err); }
    if(!schedMsg) { return res.send(404); }
    schedMsg.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}