'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _developerMap = require('../helpers/developerMap');

var _developerMap2 = _interopRequireDefault(_developerMap);

var _game = require('../models/game');

var _system = require('../models/system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchGame = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_id) {
        var game;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _game.Game.findById(_id);

                    case 2:
                        game = _context.sent;
                        _context.next = 5;
                        return _system.System.findById(game.systemId);

                    case 5:
                        game.system = _context.sent;
                        return _context.abrupt('return', game);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fetchGame(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    Query: {
        game: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
                var _id = _ref2._id;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', fetchGame(_id));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            function game(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return game;
        }(),
        games: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var games, systems;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _game.Game.find();

                            case 2:
                                games = _context3.sent;
                                _context3.next = 5;
                                return _system.System.find();

                            case 5:
                                systems = _context3.sent;
                                return _context3.abrupt('return', games.map(function (game) {
                                    return _extends({}, game.toObject(), {
                                        system: systems.find(function (system) {
                                            return system._id.equals(game.systemId);
                                        })
                                    });
                                }));

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            function games() {
                return _ref4.apply(this, arguments);
            }

            return games;
        }()
    },
    Mutation: {
        createGame: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref5) {
                var input = _ref5.input;
                var game;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return (0, _game.Game)(input).save();

                            case 2:
                                game = _context4.sent;
                                return _context4.abrupt('return', fetchGame(game._id));

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined);
            }));

            function createGame(_x4, _x5) {
                return _ref6.apply(this, arguments);
            }

            return createGame;
        }(),
        updateGame: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref7) {
                var _id = _ref7._id,
                    input = _ref7.input;
                var game;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return fetchGame(_id);

                            case 2:
                                game = _context5.sent;

                                if (game) {
                                    _context5.next = 5;
                                    break;
                                }

                                throw new Error('notFound');

                            case 5:
                                return _context5.abrupt('return', game.set(input).save());

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, undefined);
            }));

            function updateGame(_x6, _x7) {
                return _ref8.apply(this, arguments);
            }

            return updateGame;
        }(),
        prefillGame: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref9) {
                var _id = _ref9._id,
                    giantBombIndex = _ref9.giantBombIndex;
                var game, GIANTBOMB_KEY, YOUTUBE_KEY, youTubeSearch, giantBombSearch, guid, giantBombGame, input;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return fetchGame(_id);

                            case 2:
                                game = _context6.sent;
                                GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
                                YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
                                _context6.next = 7;
                                return _axios2.default.get('https://www.googleapis.com/youtube/v3/search', {
                                    params: {
                                        key: YOUTUBE_KEY,
                                        q: game.title + ' ' + game.system.name + ' gameplay',
                                        type: 'video',
                                        maxResults: 1,
                                        part: 'snippet'
                                    }
                                });

                            case 7:
                                youTubeSearch = _context6.sent;
                                _context6.next = 10;
                                return _axios2.default.get('https://www.giantbomb.com/api/search', {
                                    params: {
                                        api_key: GIANTBOMB_KEY,
                                        query: game.title,
                                        resources: 'game',
                                        limit: giantBombIndex + 1,
                                        field_list: 'guid',
                                        format: 'json'
                                    }
                                });

                            case 10:
                                giantBombSearch = _context6.sent;
                                guid = giantBombSearch.data.results[giantBombIndex].guid;
                                _context6.next = 14;
                                return _axios2.default.get('https://www.giantbomb.com/api/game/' + guid, {
                                    params: {
                                        api_key: GIANTBOMB_KEY,
                                        field_list: 'deck,original_release_date,developers,genres',
                                        format: 'json'
                                    }
                                });

                            case 14:
                                giantBombGame = _context6.sent;
                                input = {
                                    description: giantBombGame.data.results.deck ? giantBombGame.data.results.deck.replace(/&amp;/g, '&') : '',
                                    release: giantBombGame.data.results.original_release_date ? parseInt(giantBombGame.data.results.original_release_date.substring(0, 4), 10) : '',
                                    developer: giantBombGame.data.results.developers ? _developerMap2.default[giantBombGame.data.results.developers[0].name] || giantBombGame.data.results.developers[0].name : '',
                                    genre: giantBombGame.data.results.genres ? giantBombGame.data.results.genres.map(function (genre) {
                                        return genre.name;
                                    }).join(',') : '',
                                    youTubeId: youTubeSearch.data.items[0].id.videoId
                                };
                                return _context6.abrupt('return', game.set(input).save());

                            case 17:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, undefined);
            }));

            function prefillGame(_x8, _x9) {
                return _ref10.apply(this, arguments);
            }

            return prefillGame;
        }(),
        deleteGame: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref11) {
                var _id = _ref11._id;
                var game;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return fetchGame(_id);

                            case 2:
                                game = _context7.sent;

                                if (game) {
                                    _context7.next = 5;
                                    break;
                                }

                                throw new Error('notFound');

                            case 5:
                                return _context7.abrupt('return', game.remove());

                            case 6:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, undefined);
            }));

            function deleteGame(_x10, _x11) {
                return _ref12.apply(this, arguments);
            }

            return deleteGame;
        }()
    }
};