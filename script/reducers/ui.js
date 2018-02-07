import * as actions from 'actions/ui';
import { createReducer } from './_helpers';

export default createReducer({
    expandedGame: null,
    groupBy: 'system',
}, {
    [actions.CHANGE_GROUPING]: (state, action) => ({
        ...state,
        groupBy: action.payload.group,
    }),
    [actions.TOGGLE_GAME]: (state, action) => ({
        ...state,
        expandedGame: action.payload.id,
    }),
});
