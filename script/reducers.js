import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dlcs from 'reducers/dlcs';
import games from 'reducers/games';
import systems from 'reducers/systems';
import ui from 'reducers/ui';

export default combineReducers({
    dlcs,
    games,
    routing: routerReducer,
    systems,
    ui,
});
