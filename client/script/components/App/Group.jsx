import React from 'react';
import PropTypes from 'prop-types';
import Game from './Group/Game';

class Group extends React.Component {
    filteredGames() {
        let games = this.props.games;

        if (this.props.genreFilter.length > 0) {
            games = games.filter((game) => {
                if (!game.genre) {
                    return false;
                }

                const genres = game.genre.split(',');

                return this.props.genreFilter.every(genre => genres.includes(genre));
            });
        }

        return games.sort((a, b) => a.title.localeCompare(b.title));
    }

    render() {
        const games = this.filteredGames();

        if (games.length === 0) {
            return null;
        }

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
                        expandGame={this.props.expandGame}
                        expanded={this.props.expandedGame === game._id}
                        genreFilter={this.props.genreFilter}
                        groupBy={this.props.groupBy}
                        key={game._id}
                        toggleGenreFilter={this.props.toggleGenreFilter}
                        {...game}
                    />
                )}
            </div>
        );
    }
}

Group.defaultProps = {
    expandedGame: null,
};

Group.propTypes = {
    expandGame: PropTypes.func.isRequired,
    expandedGame: PropTypes.string,
    games: PropTypes.array.isRequired,
    genreFilter: PropTypes.array.isRequired,
    groupBy: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    toggleGenreFilter: PropTypes.func.isRequired,
};

export default Group;
