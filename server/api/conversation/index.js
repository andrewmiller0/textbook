'use strict';

var express = require('express');
var controller = require('./conversation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.show);
router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', controller.getOne);
router.post('/:id', controller.sendMsg);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
