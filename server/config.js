const path = require('path');
const convict = require('convict');

const config = convict({
    env: {
        doc: 'application environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    ports: {
        express: {
            doc: 'express server port',
            format: 'port',
            default: 4801,
            env: 'PORT',
        },
        webpackDevServer: {
            doc: 'webpack development server port',
            format: 'port',
            default: 4800,
        },
    },
    mongodbUri: {
        doc: 'url to mongo database',
        format: (value) => {
            if (!value.startsWith('mongodb://')) {
                throw new Error('must be a mongodb uri');
            }
        },
        default: 'mongodb://localhost:27017/completed-games',
        env: 'MONGODB_URI',
    },
});

const configPath = path.join(__dirname, `../config.${config.get('env')}.json`);

try {
    config.loadFile(configPath);
} catch (error) {
    // No config file found, do nothing
}

config.validate({ allowed: 'strict' });

module.exports = config;
