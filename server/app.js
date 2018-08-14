/* eslint-disable no-console */
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import express from 'express';
import config from './config';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.get('ports').webpackDevServer}`);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');

    next();
});

fs.readdirSync(path.join(__dirname, 'api')).forEach((file) => {
    app.use('/api', require(`./api/${file}`).default);
});

app.listen(config.get('ports').express, () => {
    console.log(`Server running at http://localhost:${config.get('ports').express}`);
});
