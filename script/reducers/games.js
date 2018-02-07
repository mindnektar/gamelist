import * as actions from 'actions/games';
import { createReducer } from './_helpers';

export default createReducer({}, {
    [actions.CREATE_GAME]: (state, action) => ({
        ...state,
        [action.payload.game.id]: action.payload.game,
    }),
    [actions.DELETE_GAME]: (state, action) => {
        const newState = { ...state };

        delete newState[action.payload.id];

        return newState;
    },
    [actions.LOAD_GAMES]: (state, action) => action.payload.games,
    [actions.SAVE_GAME]: (state, action) => ({
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload.data,
        },
    }),
});
