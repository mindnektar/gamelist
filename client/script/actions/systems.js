import api from 'api';

export const LOAD_SYSTEMS = 'LOAD_SYSTEMS';

export const loadSystems = () => dispatch => (
    api.loadSystems().then((systems) => {
        dispatch({
            type: LOAD_SYSTEMS,
            payload: {
                systems: systems.reduce((result, current) => ({
                    ...result,
                    [current._id]: current,
                }), {}),
            },
        });
    })
);
