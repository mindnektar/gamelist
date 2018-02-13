const uuid = require('uuid');

module.exports.seed = knex => (
    Promise.all([
        knex('game').del(),
        knex('system').del(),
        knex('dlc').del(),
    ]).then(() => {
        const games = require('../db/games.json');
        const systems = require('../db/systems.json');
        const dlcs = require('../db/dlcs.json');
        const systemIdMap = {};
        const gameIdMap = {};

        const systemRows = Object.values(systems).map((system) => {
            const id = uuid();

            systemIdMap[system.id] = id;

            return {
                id,
                name: system.name,
                order: system.order,
            };
        });

        const gameRows = Object.values(games).map((game) => {
            const id = uuid();

            gameIdMap[game.id] = id;

            return {
                id,
                title: game.title,
                system: systemIdMap[game.system],
                rating: game.rating,
                genre: game.genre,
                release: game.release,
                developer: game.developer,
                description: game.description,
                youTubeId: game.youTubeId,
            };
        });

        const dlcRows = Object.values(dlcs).map(dlc => ({
            id: uuid(),
            parent: gameIdMap[dlc.parent],
            title: dlc.title,
            rating: dlc.rating,
        }));

        return knex('system').insert(systemRows)
            .then(() => knex('game').insert(gameRows))
            .then(() => knex('dlc').insert(dlcRows));
    })
);
