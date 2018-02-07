import * as actions from 'actions/systems';
import { createReducer } from './_helpers';

export default createReducer({}, {
    [actions.LOAD_SYSTEMS]: (state, action) => action.payload.systems,
});
