import api from 'api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loadCategories = () => (dispatch) => {
    api.loadCategories().then((categories) => {
        dispatch({
            type: LOAD_CATEGORIES,
            payload: { categories },
        });
    });
};
