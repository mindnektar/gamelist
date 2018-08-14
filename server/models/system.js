import mongoose from '../mongoose';

const SystemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    order: {
        type: Number,
        unique: true,
    },
});

export const System = mongoose.model('System', SystemSchema);
