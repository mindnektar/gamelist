import * as actions from 'actions/ui';
import { createReducer } from './_helpers';

export default createReducer({
    expandedGame: null,
    genreFilter: [],
    groupBy: 'system',
}, {
    [actions.CHANGE_GENRE_FILTER]: (state, action) => ({
        ...state,
        genreFilter: action.payload.genreFilter,
    }),
    [actions.CHANGE_GROUPING]: (state, action) => ({
        ...state,
        groupBy: action.payload.group,
    }),
    [actions.TOGGLE_GAME]: (state, action) => ({
        ...state,
        expandedGame: action.payload.id,
    }),
});
