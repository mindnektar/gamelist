import * as actions from 'actions/games';
import { createReducer } from './_helpers';

export default createReducer({}, {
    [actions.CREATE_GAME]: (state, action) => ({
        ...state,
        [action.payload.game.id]: action.payload.game,
    }),
    [actions.LOAD_GAMES]: (state, action) => action.payload.games,
    [actions.SAVE_GAME]: (state, action) => ({
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload.data,
        },
    }),
});
