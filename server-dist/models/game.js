'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _mongoose = require('../mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ratingDefinition = {
    type: Number,
    min: 0,
    max: 100
};

var GameSchema = new _mongoose2.default.Schema({
    title: {
        type: String,
        required: true
    },
    systemId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'System'
    },
    rating: ratingDefinition,
    genre: {
        type: String
    },
    release: {
        type: Number,
        min: 1970,
        max: new Date().getFullYear()
    },
    developer: {
        type: String
    },
    description: {
        type: String
    },
    youTubeId: {
        type: String
    },
    compilation: {
        type: String
    },
    dlcs: [{
        title: {
            type: String,
            required: true
        },
        rating: ratingDefinition
    }]
}, {
    minimized: false
});

var Game = exports.Game = _mongoose2.default.model('Game', GameSchema);