const fetch = require('isomorphic-fetch');
const uuid = require('uuid');
const developerMap = require('../helpers/developerMap');
const retrieve = require('../helpers/retrieve');

module.exports = (app) => {
    app.get('/api/games', (request, response) => {
        retrieve(app.knex, 'game').then(data => response.send(JSON.stringify(data)));
    });

    app.get('/api/games/:id/fill/:giantBombIndex', (request, response) => {
        Promise.all([
            retrieve(app.knex, 'system'),
            retrieve(app.knex, 'game'),
        ]).then((systems, games) => {
            const GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
            const YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
            const game = games[request.params.id];
            const giantBombIndex = request.params.giantBombIndex || 0;
            const youTubeQuery = encodeURIComponent(`${game.title} ${systems[game.system].name} gameplay`);

            fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&q=${youTubeQuery}&type=video&maxResults=1&part=snippet`)
                .then(result => (
                    result.json()
                ))
                .then(({ items }) => {
                    console.log(items);

                    fetch(`https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_KEY}&query=${encodeURIComponent(game.title)}&resources=game&limit=${giantBombIndex + 1}&field_list=guid&format=json`)
                        .then(result => (
                            result.json()
                        ))
                        .then(({ results }) => (
                            results[giantBombIndex].guid
                        ))
                        .then(guid => (
                            fetch(`https://www.giantbomb.com/api/game/${guid}?api_key=${GIANTBOMB_KEY}&field_list=deck,original_release_date,developers,genres&format=json`)
                        ))
                        .then(result => (
                            result.json()
                        ))
                        .then(({ results }) => {
                            console.log(results);

                            const data = {
                                description: results.deck ?
                                    results.deck.replace(/&amp;/g, '&') :
                                    '',
                                release: results.original_release_date ?
                                    parseInt(results.original_release_date.substring(0, 4), 10) :
                                    '',
                                developer: results.developers ?
                                    (
                                        developerMap[results.developers[0].name] ||
                                        results.developers[0].name
                                    ) :
                                    '',
                                genre: results.genres ?
                                    results.genres.map(genre => genre.name).join(',') :
                                    '',
                                youTubeId: items[0].id.videoId,
                            };

                            app.knex('game').where('id', game.id).update(data).then(() => {
                                response.send({ ...game, ...data });
                            });
                        });
                });
        });
    });

    app.patch('/api/games', (request, response) => {
        app.knex('game').where('id', request.body.id).update(request.body.data).then(() => {
            response.sendStatus(204);
        });
    });

    app.post('/api/games', (request, response) => {
        const game = { id: uuid(), ...request.body };

        app.knex('game').insert(game).then(() => {
            response.send(game);
        });
    });

    app.delete('/api/games/:id', (request, response) => {
        app.knex('game').where('id', request.params.id).del().then(() => {
            response.sendStatus(204);
        });
    });
};
