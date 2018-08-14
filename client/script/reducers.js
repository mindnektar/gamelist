import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import games from 'reducers/games';
import systems from 'reducers/systems';
import ui from 'reducers/ui';

export default combineReducers({
    games,
    routing: routerReducer,
    systems,
    ui,
});
