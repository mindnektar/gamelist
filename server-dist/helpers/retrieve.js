"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (knex, table) {
    return knex.select().from(table).then(function (data) {
        return Promise.resolve(data.reduce(function (result, current) {
            return _extends({}, result, _defineProperty({}, current.id, current));
        }, {}));
    });
};