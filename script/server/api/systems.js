const retrieve = require('../helpers/retrieve');

module.exports = (app) => {
    app.get('/api/systems', (request, response) => {
        retrieve(app.knex, 'system').then(data => response.send(JSON.stringify(data)));
    });
};
