import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import Game from './System/Game';

class System extends React.Component {
    filteredGames() {
        return Object.values(this.props.games)
            .filter(game => game.system === this.props.id)
            .sort((a, b) => a.title.localeCompare(b.title));
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
                        key={game.title}
                        {...game}
                    />
                )}
            </div>
        );
    }
}

System.propTypes = {
    games: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default connectWithRouter(
    state => ({
        games: state.games,
    }),
    null,
    System
);
