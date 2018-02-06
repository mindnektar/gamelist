import * as actions from 'actions/categories';
import { createReducer } from './_helpers';

export default createReducer([], {
    [actions.LOAD_CATEGORIES]: (state, action) => action.payload.categories,
});
