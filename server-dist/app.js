'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /* eslint-disable no-console */


app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + _config2.default.get('ports').webpackDevServer);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');

    next();
});

_fs2.default.readdirSync(_path2.default.join(__dirname, 'api')).forEach(function (file) {
    app.use('/api', require('./api/' + file).default);
});

app.listen(_config2.default.get('ports').express, function () {
    console.log('Server running at http://localhost:' + _config2.default.get('ports').express);
});