import { Game } from '../models/game';
import { System } from '../models/system';

const fetchGame = async (_id) => {
    const game = await Game.findById(_id);

    game.system = await System.findById(game.systemId);

    return game;
};

export default {
    Query: {
        game: async (_, { _id }) => fetchGame(_id),
        games: async () => {
            const games = await Game.find();
            const systems = await System.find();

            return games.map(game => ({
                ...game.toObject(),
                system: systems.find(system => system._id.equals(game.systemId)),
            }));
        },
    },
    Mutation: {
        createGame: async (_, { input }) => new Game(input).save(),
        updateGame: async (_, { _id, input }) => {
            const game = await fetchGame(_id);

            if (!game) {
                throw new Error('notFound');
            }

            return game.set(input).save();
        },
        deleteGame: async (_, { _id }) => {
            const game = await fetchGame(_id);

            if (!game) {
                throw new Error('notFound');
            }

            return game.remove();
        },
    },
};
