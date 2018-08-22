"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (knex, table) {
    return knex.select().from(table).then(function (data) {
        return _promise2.default.resolve(data.reduce(function (result, current) {
            return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, current.id, current));
        }, {}));
    });
};