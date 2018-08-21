'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _system = require('../models/system');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    Query: {
        system: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
                var _id = _ref._id;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', _system.System.findById(_id));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            function system(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return system;
        }(),
        systems: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', _system.System.find());

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            function systems() {
                return _ref3.apply(this, arguments);
            }

            return systems;
        }()
    },
    Mutation: {
        createSystem: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref4) {
                var input = _ref4.input;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', new _system.System(input).save());

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            function createSystem(_x3, _x4) {
                return _ref5.apply(this, arguments);
            }

            return createSystem;
        }(),
        updateSystem: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref6) {
                var _id = _ref6._id,
                    input = _ref6.input;
                var system;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _system.System.findById(_id);

                            case 2:
                                system = _context4.sent;

                                if (system) {
                                    _context4.next = 5;
                                    break;
                                }

                                throw new Error('notFound');

                            case 5:
                                return _context4.abrupt('return', system.set(input).save());

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined);
            }));

            function updateSystem(_x5, _x6) {
                return _ref7.apply(this, arguments);
            }

            return updateSystem;
        }(),
        deleteSystem: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref8) {
                var _id = _ref8._id;
                var system;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return _system.System.findById(_id);

                            case 2:
                                system = _context5.sent;

                                if (system) {
                                    _context5.next = 5;
                                    break;
                                }

                                throw new Error('notFound');

                            case 5:
                                return _context5.abrupt('return', system.remove());

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, undefined);
            }));

            function deleteSystem(_x7, _x8) {
                return _ref9.apply(this, arguments);
            }

            return deleteSystem;
        }()
    }
};