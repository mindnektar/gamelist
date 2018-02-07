import * as actions from 'actions/ui';
import { createReducer } from './_helpers';

export default createReducer({
    expandedGame: null,
}, {
    [actions.TOGGLE_GAME]: (state, action) => ({
        ...state,
        expandedGame: action.payload.id,
    }),
});
