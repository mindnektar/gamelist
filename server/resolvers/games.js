import axios from 'axios';
import developerMap from '../helpers/developerMap';
import { Game } from '../models/game';
import { System } from '../models/system';

export default {
    Query: {
        game: async (_, { _id }) => Game.findById(_id),
        games: async () => Game.find(),
    },
    Mutation: {
        createGame: async (_, { input }) => {
            const game = await Game(input).save();

            return Game.findById(game._id);
        },
        updateGame: async (_, { _id, input }) => {
            const game = await Game.findById(_id);

            if (!game) {
                throw new Error('notFound');
            }

            return game.set(input).save();
        },
        prefillGame: async (_, { _id, giantBombIndex }) => {
            const game = await Game.findById(_id);
            const GIANTBOMB_KEY = 'aebe8a5bc71b49509966b5ea50e7951d79d99cd8';
            const YOUTUBE_KEY = 'AIzaSyCC-9pROIO9leCFfkqlkfDR5wjMihZtvcA';
            const youTubeSearch = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: YOUTUBE_KEY,
                    q: `${game.title} ${game.system.name} gameplay`,
                    type: 'video',
                    maxResults: 1,
                    part: 'snippet',
                },
            });
            const giantBombSearch = await axios.get('https://www.giantbomb.com/api/search', {
                params: {
                    api_key: GIANTBOMB_KEY,
                    query: game.title,
                    resources: 'game',
                    limit: giantBombIndex + 1,
                    field_list: 'guid',
                    format: 'json',
                },
            });
            const { guid } = giantBombSearch.data.results[giantBombIndex];
            const giantBombGame = await axios.get(`https://www.giantbomb.com/api/game/${guid}`, {
                params: {
                    api_key: GIANTBOMB_KEY,
                    field_list: 'deck,original_release_date,developers,genres',
                    format: 'json',
                },
            });
            const input = {
                description: giantBombGame.data.results.deck ?
                    giantBombGame.data.results.deck.replace(/&amp;/g, '&') :
                    '',
                release: giantBombGame.data.results.original_release_date ?
                    parseInt(giantBombGame.data.results.original_release_date.substring(0, 4), 10) :
                    '',
                developer: giantBombGame.data.results.developers ?
                    (
                        developerMap[giantBombGame.data.results.developers[0].name] ||
                        giantBombGame.data.results.developers[0].name
                    ) :
                    '',
                genre: giantBombGame.data.results.genres ?
                    giantBombGame.data.results.genres.map(genre => genre.name).join(',') :
                    '',
                youTubeId: youTubeSearch.data.items[0].id.videoId,
            };

            return game.set(input).save();
        },
        deleteGame: async (_, { _id }) => {
            const game = await Game.findById(_id);

            if (!game) {
                throw new Error('notFound');
            }

            return game.remove();
        },
    },
    Game: {
        system: async parent => System.findById(parent.systemId),
    },
};
