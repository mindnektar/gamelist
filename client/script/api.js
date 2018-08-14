import fetch from 'isomorphic-fetch';

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4001' : '';

const request = (path, method = 'GET', body) => (
    fetch(`${url}/api/${path}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-type': 'application/json',
        },
    })
).then(response => (
    new Promise((resolve, reject) => {
        switch (response.status) {
            case 200:
                resolve(response.json());
                break;

            case 204:
                resolve(null);
                break;

            case 404:
                reject({ errors: 'not found' });
                break;

            case 500:
                reject({ errors: 'server error' });
                break;

            default:
                response.json().then(reject);
        }
    })
));

export default {
    createGame: (title, systemId) => request('games', 'POST', { title, systemId }),
    deleteGame: id => request(`games/${id}`, 'DELETE'),
    fillGameData: (id, giantBombIndex = 0) => request(`games/${id}/fill/${giantBombIndex}`),
    loadDlcs: () => request('dlcs'),
    loadGames: () => request('games'),
    loadSystems: () => request('systems'),
    saveGame: (id, data) => request(`games/${id}`, 'PATCH', data),
};