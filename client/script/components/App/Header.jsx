import React from 'react';
import PropTypes from 'prop-types';
import graphqlQuery from 'graphqlQuery';
import GetGames from 'queries/games/GetGames.gql';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header__label">
                    List of completed games
                </div>

                <div className="header__total">
                    {this.props.games.data.length} games
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    games: PropTypes.object.isRequired,
};

export default graphqlQuery(GetGames, Header);
