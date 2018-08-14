import fetch from 'isomorphic-fetch';
import { Router } from 'express';
import developerMap from '../helpers/developerMap';
import { Game } from '../models/game';
import { System } from '../models/system';

const router = new Router();

router.get('/games', (request, response, next) => {
    Game.find()
        .then(games => response.send(games))
        .catch(next);
});

router.get('/games/:id/fill/:giantBombIndex', (request, response, next) => {
    Game.findById(request.params.id)
        .then(game => (
            System.findById(game.systemId)
                .then((system) => {
                    const GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
                    const YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
                    const giantBombIndex = request.params.giantBombIndex || 0;
                    const youTubeQuery = encodeURIComponent(`${game.title} ${system.name} gameplay`);

                    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&q=${youTubeQuery}&type=video&maxResults=1&part=snippet`)
                        .then(result => result.json())
                        .then(({ items }) => {
                            console.log(items);

                            return fetch(`https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_KEY}&query=${encodeURIComponent(game.title)}&resources=game&limit=${giantBombIndex + 1}&field_list=guid&format=json`)
                                .then(result => result.json())
                                .then(({ results }) => results[giantBombIndex].guid)
                                .then(guid => fetch(`https://www.giantbomb.com/api/game/${guid}?api_key=${GIANTBOMB_KEY}&field_list=deck,original_release_date,developers,genres&format=json`))
                                .then(result => result.json())
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

                                    return game.set(data).save();
                                });
                        });
                })
        ))
        .then(game => response.send(game))
        .catch(next);
});

router.patch('/games/:id', (request, response, next) => {
    Game.findById(request.params.id)
        .then((game) => {
            if (!game) {
                return response.sendStatus(404);
            }

            return game.set(request.body.data).save();
        })
        .then(game => response.send(game))
        .catch(next);
});

router.post('/games', (request, response, next) => {
    new Game(request.body)
        .save()
        .then(game => response.send(game))
        .catch(next);
});

router.delete('/games/:id', (request, response, next) => {
    Game.findById(request.params.id)
        .then((game) => {
            if (!game) {
                return response.sendStatus(404);
            }

            return game.remove();
        })
        .then(() => response.sendStatus(204))
        .catch(next);
});

export default router;
