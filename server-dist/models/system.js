'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.System = undefined;

var _mongoose = require('../mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SystemSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: Number,
        unique: true
    }
});

var System = exports.System = _mongoose2.default.model('System', SystemSchema);