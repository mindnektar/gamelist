'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _system = require('../models/system');

var router = new _express.Router();

router.get('/systems', function (request, response, next) {
    _system.System.find().then(function (systems) {
        return response.send(systems);
    }).catch(next);
});

exports.default = router;