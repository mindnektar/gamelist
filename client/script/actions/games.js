import api from 'api';

export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const LOAD_GAMES = 'LOAD_GAMES';
export const SAVE_GAME = 'SAVE_GAME';

export const createGame = (title, systemId) => dispatch => (
    api.createGame(title, systemId).then((game) => {
        dispatch({
            type: CREATE_GAME,
            payload: { game },
        });

        return game;
    })
);

export const deleteGame = _id => dispatch => (
    api.deleteGame(_id).then(() => {
        dispatch({
            type: DELETE_GAME,
            payload: { _id },
        });
    })
);

export const fillGameData = (_id, giantBombIndex) => dispatch => (
    api.fillGameData(_id, giantBombIndex).then((data) => {
        dispatch({
            type: SAVE_GAME,
            payload: { _id, data },
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

export const saveGame = (_id, data) => (dispatch) => {
    dispatch({
        type: SAVE_GAME,
        payload: { _id, data },
    });

    return api.saveGame(_id, data);
};
