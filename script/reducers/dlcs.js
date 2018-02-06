import * as actions from 'actions/dlcs';
import { createReducer } from './_helpers';

export default createReducer({}, {
    [actions.LOAD_DLCS]: (state, action) => action.payload.dlcs,
});
