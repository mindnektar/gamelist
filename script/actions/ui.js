export const CHANGE_GROUPING = 'CHANGE_GROUPING';
export const TOGGLE_GAME = 'TOGGLE_GAME';

export const changeGrouping = group => ({
    type: CHANGE_GROUPING,
    payload: { group },
});

export const toggleGame = id => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_GAME,
        payload: { id: getState().ui.expandedGame === id ? null : id },
    });
};
