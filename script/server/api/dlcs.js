const retrieve = require('../helpers/retrieve');

module.exports = (app) => {
    app.get('/api/dlcs', (request, response) => {
        retrieve(app.knex, 'dlc').then(data => response.send(JSON.stringify(data)));
    });
};
