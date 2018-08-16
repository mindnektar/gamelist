import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GetGames from 'queries/games/GetGames.gql';
import Game from './Group/Game';

class Group extends React.Component {
    filteredGames() {
        let games = this.props.data.games;

        if (this.props.data.ui.groupBy) {
            games = games.filter((game) => {
                const groupBy = this.props.data.ui.groupBy === 'systemId' ?
                    game.system._id :
                    game[this.props.data.ui.groupBy];

                return groupBy === this.props._id;
            });
        }

        if (this.props.data.ui.genreFilter.length > 0) {
            games = games.filter((game) => {
                const genres = game.genre.split(',');

                return this.props.data.ui.genreFilter.every(genre => genres.includes(genre));
            });
        }

        return games.sort((a, b) => a.title.localeCompare(b.title));
    }

    render() {
        const games = this.filteredGames();

        return (
            <div className="group">
                <div className="group__header">
                    <div className="group__label">
                        {this.props.name}
                    </div>

                    <div className="group__count">
                        {`${games.length} game${games.length !== 1 ? 's' : ''}`}
                    </div>
                </div>

                {games.map(game =>
                    <Game
                        key={game._id}
                        {...game}
                    />
                )}
            </div>
        );
    }
}

Group.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    data: PropTypes.shape({
        games: PropTypes.array,
        ui: PropTypes.object,
    }).isRequired,
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default graphql(GetGames)(Group);
