'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _express = require('express');

var _developerMap = require('../helpers/developerMap');

var _developerMap2 = _interopRequireDefault(_developerMap);

var _game = require('../models/game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/games', function (request, response, next) {
    _game.Game.find().then(function (games) {
        return response.send(games);
    }).catch(next);
});

router.get('/games/:id/fill/:giantBombIndex', function (request, response) {
    Promise.all([retrieve(app.knex, 'system'), retrieve(app.knex, 'game')]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            systems = _ref2[0],
            games = _ref2[1];

        var GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
        var YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
        var game = games[request.params.id];
        var giantBombIndex = request.params.giantBombIndex || 0;
        var youTubeQuery = encodeURIComponent(game.title + ' ' + systems[game.system].name + ' gameplay');

        (0, _isomorphicFetch2.default)('https://www.googleapis.com/youtube/v3/search?key=' + YOUTUBE_KEY + '&q=' + youTubeQuery + '&type=video&maxResults=1&part=snippet').then(function (result) {
            return result.json();
        }).then(function (_ref3) {
            var items = _ref3.items;

            console.log(items);

            (0, _isomorphicFetch2.default)('https://www.giantbomb.com/api/search/?api_key=' + GIANTBOMB_KEY + '&query=' + encodeURIComponent(game.title) + '&resources=game&limit=' + (giantBombIndex + 1) + '&field_list=guid&format=json').then(function (result) {
                return result.json();
            }).then(function (_ref4) {
                var results = _ref4.results;
                return results[giantBombIndex].guid;
            }).then(function (guid) {
                return (0, _isomorphicFetch2.default)('https://www.giantbomb.com/api/game/' + guid + '?api_key=' + GIANTBOMB_KEY + '&field_list=deck,original_release_date,developers,genres&format=json');
            }).then(function (result) {
                return result.json();
            }).then(function (_ref5) {
                var results = _ref5.results;

                console.log(results);

                var data = {
                    description: results.deck ? results.deck.replace(/&amp;/g, '&') : '',
                    release: results.original_release_date ? parseInt(results.original_release_date.substring(0, 4), 10) : '',
                    developer: results.developers ? _developerMap2.default[results.developers[0].name] || results.developers[0].name : '',
                    genre: results.genres ? results.genres.map(function (genre) {
                        return genre.name;
                    }).join(',') : '',
                    youTubeId: items[0].id.videoId
                };

                app.knex('game').where('id', game.id).update(data).then(function () {
                    response.send(_extends({}, game, data));
                });
            });
        });
    });
});

router.patch('/games/:id', function (request, response, next) {
    _game.Game.findById(request.params.id).then(function (game) {
        if (!game) {
            return response.sendStatus(404);
        }

        return game.set(request.body.data).save();
    }).then(function (game) {
        return response.send(game);
    }).catch(next);
});

router.post('/games', function (request, response, next) {
    new _game.Game(request.body).save().then(function (game) {
        return response.send(game);
    }).catch(next);
});

router.delete('/games/:id', function (request, response, next) {
    _game.Game.findById(request.params.id).then(function (game) {
        if (!game) {
            return response.sendStatus(404);
        }

        return game.remove();
    }).then(function () {
        return response.sendStatus(204);
    }).catch(next);
});

exports.default = router;