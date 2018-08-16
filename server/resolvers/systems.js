import { System } from '../models/system';

export default {
    Query: {
        system: async (_, { _id }) => System.findById(_id),
        systems: async () => System.find(),
    },
    Mutation: {
        createGame: async (_, { input }) => new System(input).save(),
        updateGame: async (_, { _id, input }) => {
            const system = await System.findById(_id);

            if (!system) {
                throw new Error('notFound');
            }

            return system.set(input).save();
        },
        deleteGame: async (_, { _id }) => {
            const system = await System.findById(_id);

            if (!system) {
                throw new Error('notFound');
            }

            return system.remove();
        },
    },
};
