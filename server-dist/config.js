'use strict';

var path = require('path');
var convict = require('convict');

var config = convict({
    env: {
        doc: 'application environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ports: {
        express: {
            doc: 'express server port',
            format: 'port',
            default: 4001
        },
        webpackDevServer: {
            doc: 'webpack development server port',
            format: 'port',
            default: 4000
        }
    },
    mongodbUri: {
        doc: 'url to mongo database',
        format: function format(value) {
            if (!value.startsWith('mongodb://')) {
                throw new Error('must be a mongodb uri');
            }
        },
        default: 'mongodb://localhost:27017/completed-games',
        env: 'MONGODB_URI'
    }
});

var configPath = path.join(__dirname, '../config.' + config.get('env') + '.json');

try {
    config.loadFile(configPath);
} catch (error) {
    // No config file found, do nothing
}

config.validate({ allowed: 'strict' });

module.exports = config;