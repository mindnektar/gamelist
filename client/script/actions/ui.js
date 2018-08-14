export const CHANGE_GENRE_FILTER = 'CHANGE_GENRE_FILTER';
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

export const toggleGenreFilter = genre => (dispatch, getState) => {
    const genreFilter = [...getState().ui.genreFilter];
    const index = genreFilter.indexOf(genre);

    if (index >= 0) {
        genreFilter.splice(index, 1);
    } else {
        genreFilter.push(genre);
    }

    dispatch({ type: CHANGE_GENRE_FILTER, payload: { genreFilter } });
};
