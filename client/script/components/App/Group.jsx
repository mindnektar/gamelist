import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import Game from './Group/Game';

class Group extends React.Component {
    filteredGames() {
        let games = Object.values(this.props.games);

        if (this.props.groupBy) {
            games = games.filter(game => game[this.props.groupBy] === this.props._id);
        }

        if (this.props.genreFilter.length > 0) {
            games = games.filter((game) => {
                const genres = game.genre.split(',');

                return this.props.genreFilter.every(genre => genres.includes(genre));
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
    games: PropTypes.object.isRequired,
    genreFilter: PropTypes.array.isRequired,
    groupBy: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default connectWithRouter(
    state => ({
        games: state.games,
        genreFilter: state.ui.genreFilter,
        groupBy: state.ui.groupBy,
    }),
    null,
    Group
);
