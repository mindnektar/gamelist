import mongoose from '../mongoose';

const ratingDefinition = {
    type: Number,
    min: 0,
    max: 100,
    get: rating => (rating / 10).toFixed(1),
    set: rating => rating * 10,
};

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    systemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System',
    },
    rating: ratingDefinition,
    genre: {
        type: String,
    },
    release: {
        type: Number,
        min: 1970,
        max: new Date().getFullYear(),
    },
    developer: {
        type: String,
    },
    description: {
        type: String,
    },
    youTubeId: {
        type: String,
    },
    compilation: {
        type: String,
    },
    dlcs: [{
        title: {
            type: String,
            required: true,
        },
        rating: ratingDefinition,
    }],
}, {
    minimized: false,
});

export const Game = mongoose.model('Game', GameSchema);
