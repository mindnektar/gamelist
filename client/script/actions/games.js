import api from 'api';

export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const LOAD_GAMES = 'LOAD_GAMES';
export const SAVE_GAME = 'SAVE_GAME';

export const createGame = (title, system) => dispatch => (
    api.createGame(title, system).then((game) => {
        dispatch({
            type: CREATE_GAME,
            payload: { game },
        });

        return game;
    })
);

export const deleteGame = id => dispatch => (
    api.deleteGame(id).then(() => {
        dispatch({
            type: DELETE_GAME,
            payload: { id },
        });
    })
);

export const fillGameData = (id, giantBombIndex) => dispatch => (
    api.fillGameData(id, giantBombIndex).then((data) => {
        dispatch({
            type: SAVE_GAME,
            payload: { id, data },
        });

        return data;
    })
);

export const loadGames = () => dispatch => (
    api.loadGames().then((games) => {
        dispatch({
            type: LOAD_GAMES,
            payload: {
                games: games.reduce((result, current) => ({
                    ...result,
                    [current._id]: current,
                }), {}),
            },
        });
    })
);

export const saveGame = (id, data) => (dispatch) => {
    dispatch({
        type: SAVE_GAME,
        payload: { id, data },
    });

    return api.saveGame(id, data);
};
