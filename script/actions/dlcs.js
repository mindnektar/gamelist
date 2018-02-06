import api from 'api';

export const LOAD_DLCS = 'LOAD_DLCS';

export const loadDlcs = () => dispatch => (
    api.loadDlcs().then((dlcs) => {
        dispatch({
            type: LOAD_DLCS,
            payload: { dlcs },
        });
    })
);
