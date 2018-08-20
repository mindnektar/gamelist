import React from 'react';
import PropTypes from 'prop-types';
import graphqlQuery from 'graphqlQuery';
import GetGames from 'queries/games/GetGames.gql';
import GetUi from 'queries/ui/GetUi.gql';
import Game from './Group/Game';

class Group extends React.Component {
    filteredGames() {
        let games = [...this.props.games.data];

        if (this.props.ui.data.groupBy) {
            games = games.filter((game) => {
                const groupBy = this.props.ui.data.groupBy === 'systemId' ?
                    game.system._id :
                    game[this.props.ui.data.groupBy];

                return groupBy === this.props._id;
            });
        }

        if (this.props.ui.data.genreFilter.length > 0) {
            games = games.filter((game) => {
                const genres = game.genre.split(',');

                return this.props.ui.data.genreFilter.every(genre => genres.includes(genre));
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
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    ui: PropTypes.object.isRequired,
};

export default graphqlQuery([GetGames, GetUi], Group);
