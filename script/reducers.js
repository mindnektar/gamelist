import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from 'reducers/categories';
import dlcs from 'reducers/dlcs';
import games from 'reducers/games';
import systems from 'reducers/systems';

export default combineReducers({
    categories,
    dlcs,
    games,
    routing: routerReducer,
    systems,
});
