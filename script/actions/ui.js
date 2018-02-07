export const TOGGLE_GAME = 'TOGGLE_GAME';

export const toggleGame = id => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_GAME,
        payload: { id: getState().ui.expandedGame === id ? null : id },
    });
};
