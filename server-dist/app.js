'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphqlYoga = require('graphql-yoga');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, 'typeDefs'))),
    resolvers: (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, 'resolvers')))
}); /* eslint-disable no-console */


server.express.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

server.start({
    port: _config2.default.get('ports').express,
    endpoint: '/api',
    playground: '/api'
}, function () {
    console.log('Server running at http://localhost:' + _config2.default.get('ports').express);
});

process.on('SIGINT', function () {
    process.exit();
});