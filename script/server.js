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

app.get('/api/games/:id/fill/:giantBombIndex', (request, response) => {
    fs.readFile(systemsPath, 'utf8', (_, systems) => {
        fs.readFile(gamesPath, 'utf8', (__, data) => {
            const GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
            const YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
            const games = JSON.parse(data);
            let game = games[request.params.id];
            const giantBombIndex = request.params.giantBombIndex || 0;
            const youTubeQuery = encodeURIComponent(`${game.title} ${JSON.parse(systems)[game.system].name} gameplay`);

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

                            const developerMap = {
                                '2K Marin': '2K Games',
                                '3 Minute Games, LLC': '3 Minute Games',
                                'Acclaim Studios Manchester': 'Acclaim',
                                'Acclaim Studios Salt Lake City': 'Acclaim',
                                'AlphaDream Corporation, Ltd.': 'AlphaDream',
                                'ASCII Corporation': 'ASCII',
                                'Athena Co., Ltd.': 'Athena',
                                'Atlus Co., Ltd.': 'Atlus',
                                'Bethesda Game Studios': 'Bethesda',
                                'Blizzard Entertainment': 'Blizzard',
                                'Camelot Software Planning': 'Camelot',
                                'cavia inc.': 'Cavia',
                                'Crystal Dynamics, Inc.': 'Crystal Dynamics',
                                'Dimps Corporation': 'Dimps',
                                'DONTNOD Entertainment': 'DONTNOD',
                                'Eidos-Montréal': 'Eidos',
                                'Eurocom Entertainment Software': 'Eurocom',
                                'Flagship Co., Ltd.': 'Flagship',
                                'Fountainhead Entertainment, Inc.': 'Fountainhead',
                                'Game Freak, Inc.': 'Game Freak',
                                'Gameloft S.A.': 'Gameloft',
                                'Gearbox Software LLC': 'Gearbox',
                                'Grasshopper Manufacture inc.': 'Grasshopper',
                                'HAL Laboratory, Inc.': 'HAL Laboratory',
                                'Harmonix Music Systems, Inc.': 'Harmonix',
                                'Hudson Entertainment, Inc.': 'Hudson',
                                'Human Entertainment, Inc.': 'Human Entertainment',
                                'Human Head Studios, Inc.': 'Human Head',
                                'iNiS Corp.': 'iNiS',
                                'Intelligent Systems Co., Ltd.': 'Intelligent Systems',
                                'Inti Creates Co., Ltd.': 'Inti Creates',
                                'Klei Entertainment Inc.': 'Klei',
                                'Konami Computer Entertainment Osaka Co., Ltd.': 'Konami',
                                'Konami Computer Entertainment Tokyo': 'Konami',
                                'Level-5 Inc.': 'Level-5',
                                'Monolith Productions, Inc.': 'Monolith Productions',
                                'Neverland Co., Ltd.': 'Neverland',
                                'Neversoft Entertainment': 'Neversoft',
                                'Nintendo EAD': 'Nintendo',
                                'Nintendo EPD': 'Nintendo',
                                'Nintendo R&D1': 'Nintendo',
                                'Nintendo R&D3': 'Nintendo',
                                'Now Production Co., Ltd.': 'Now Production',
                                'Number None Inc': 'Number None',
                                'Obsidian Entertainment': 'Obsidian',
                                'Pandemic Studios': 'Pandemic',
                                'Paon Corporation, Ltd.': 'Paon',
                                'PopCap Games, Inc.': 'PopCap Games',
                                'Quintet Co., Ltd.': 'Quintet',
                                'Racjin Co., Ltd.': 'Racjin',
                                'Rare, Ltd.': 'Rare',
                                'RedLynx Ltd': 'RedLynx',
                                'Remedy Entertainment Ltd.': 'Remedy',
                                'Rockstar North': 'Rockstar',
                                'Rockstar San Diego': 'Rockstar',
                                'Rocksteady Studios Ltd': 'Rocksteady',
                                'Silicon Knights, Inc.': 'Silicon Knights',
                                'SRD Co. Ltd.': 'Nintendo',
                                'Sumo Digital Ltd.': 'Sumo Digital',
                                'Taito Corporation': 'Taito',
                                'Techland Sp. z o.o.': 'Techland',
                                'Traveller\'s Tales Ltd.': 'Traveller\'s Tales',
                                'tri-Crescendo Inc.': 'tri-Crescendo',
                                'Ubisoft Montpellier Studios': 'Ubisoft',
                                'Ubisoft Montreal Studios': 'Ubisoft',
                                'Ubisoft Shanghai Studios': 'Ubisoft',
                                'Valve Corporation': 'Valve',
                                'WayForward Technologies': 'WayForward',
                                'Westwood Studios, Inc.': 'Westwood',
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
