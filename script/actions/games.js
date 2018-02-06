import api from 'api';

export const LOAD_GAMES = 'LOAD_GAMES';
export const SAVE_GAME = 'SAVE_GAME';

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
            payload: { games },
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
