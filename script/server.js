const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('isomorphic-fetch');

const app = express();
const gamesPath = 'script/server/db/games.json';
const systemsPath = 'script/server/db/systems.json';

app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');

    next();
});

app.get('/api/games', (request, response) => {
    fs.readFile(gamesPath, (error, data) => {
        response.send(data);
    });
});

app.get('/api/games/:id/fill', (request, response) => {
    fs.readFile(systemsPath, 'utf8', (_, systems) => {
        fs.readFile(gamesPath, 'utf8', (__, data) => {
            const GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
            const YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
            const games = JSON.parse(data);
            let game = games[request.params.id];
            const youTubeQuery = encodeURIComponent(`${game.title} ${JSON.parse(systems)[game.system].name} gameplay`);

            fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&q=${youTubeQuery}&type=video&maxResults=1&part=snippet`)
                .then(result => (
                    result.json()
                ))
                .then(({ items }) => {
                    console.log(items);

                    fetch(`https://www.giantbomb.com/api/search/?api_key=${GIANTBOMB_KEY}&query=${encodeURIComponent(game.title)}&resources=game&limit=3&field_list=guid&format=json`)
                        .then(result => (
                            result.json()
                        ))
                        .then(({ results }) => (
                            results[0].guid
                        ))
                        .then(guid => (
                            fetch(`https://www.giantbomb.com/api/game/${guid}?api_key=${GIANTBOMB_KEY}&field_list=deck,original_release_date,developers,genres&format=json`)
                        ))
                        .then(result => (
                            result.json()
                        ))
                        .then(({ results }) => {
                            console.log(results);

                            const developerMap = {
                                '2K Marin': '2K Games',
                                '3 Minute Games, LLC': '3 Minute Games',
                                'Bethesda Game Studios': 'Bethesda',
                                'cavia inc.': 'Cavia',
                                'Crystal Dynamics, Inc.': 'Crystal Dynamics',
                                'DONTNOD Entertainment': 'DONTNOD',
                                'Eidos-Montréal': 'Eidos',
                                'Gearbox Software LLC': 'Gearbox',
                                'Grasshopper Manufacture inc.': 'Grasshopper',
                                'Harmonix Music Systems, Inc.': 'Harmonix',
                                'Human Head Studios, Inc.': 'Human Head',
                                'Klei Entertainment Inc.': 'Klei',
                                'Inti Creates Co., Ltd.': 'Inti Creates',
                                'Monolith Productions, Inc.': 'Monolith Productions',
                                'Neversoft Entertainment': 'Neversoft',
                                'Nintendo EAD': 'Nintendo',
                                'Nintendo EPD': 'Nintendo',
                                'Number None Inc': 'Number None',
                                'Obsidian Entertainment': 'Obsidian',
                                'Pandemic Studios': 'Pandemic',
                                'PopCap Games, Inc.': 'PopCap Games',
                                'Rare, Ltd.': 'Rare',
                                'RedLynx Ltd': 'RedLynx',
                                'Remedy Entertainment Ltd.': 'Remedy',
                                'Rockstar North': 'Rockstar',
                                'Rockstar San Diego': 'Rockstar',
                                'Rocksteady Studios Ltd': 'Rocksteady',
                                'Sumo Digital Ltd.': 'Sumo Digital',
                                'Taito Corporation': 'Taito',
                                'Techland Sp. z o.o.': 'Techland',
                                'tri-Crescendo Inc.': 'tri-Crescendo',
                                'Ubisoft Montpellier Studios': 'Ubisoft',
                                'Ubisoft Montreal Studios': 'Ubisoft',
                                'Ubisoft Shanghai Studios': 'Ubisoft',
                                'Valve Corporation': 'Valve',
                                'YAGER Development GmbH': 'Yager Development',
                            };

                            game = {
                                ...game,
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
                                genre: results.genres.map(genre => genre.name).join(','),
                                youTubeId: items[0].id.videoId,
                            };

                            fs.writeFile(gamesPath, JSON.stringify({
                                ...games,
                                [game.id]: game,
                            }), () => {
                                response.send(game);
                            });
                        });
                });
        });
    });
});

app.patch('/api/games', (request, response) => {
    fs.readFile(gamesPath, (error, data) => {
        const games = JSON.parse(data);

        games[request.body.id] = {
            ...games[request.body.id],
            ...request.body.data,
        };

        fs.writeFile(gamesPath, JSON.stringify(games), () => {
            response.sendStatus(204);
        });
    });
});

app.get('/api/dlcs', (request, response) => {
    fs.readFile('script/server/db/dlcs.json', (error, data) => {
        response.send(data);
    });
});

app.get('/api/systems', (request, response) => {
    fs.readFile(systemsPath, (error, data) => {
        response.send(data);
    });
});

app.get('/api/categories', (request, response) => {
    fs.readFile('script/server/db/categories.json', (error, data) => {
        response.send(data);
    });
});

app.listen(4001, () => {
    console.log('Server running at http://localhost:4001');
});
