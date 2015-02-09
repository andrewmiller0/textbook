'use strict';

var express = require('express');
var controller = require('./classroom.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/unpopulated', controller.getUnpopulated);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/homework', controller.addHomework);

module.exports = router;
