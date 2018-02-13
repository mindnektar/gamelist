/* eslint-disable no-console */
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const knex = require('knex');
const app = require('express')();

app.set('port', (process.env.PORT || 4001));

app.knex = knex(require('./server/knexfile').development);

app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');

    next();
});

fs.readdirSync(path.join(__dirname, 'server/api')).forEach((file) => {
    require(`./server/api/${file}`)(app);
});

if (app.get('env') === 'production') {
    app.get('/*', (request, response) => {
        response.sendFile(path.join(__dirname, '../public', request.path));
    });
}

app.listen(app.get('port'), () => {
    console.log('Server running at http://localhost:4001');
});
