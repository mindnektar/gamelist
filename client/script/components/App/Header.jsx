import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GetGames from 'queries/games/GetGames.gql';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header__label">
                    List of completed games
                </div>

                <div className="header__total">
                    {this.props.data.games.length} games
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    data: PropTypes.shape({
        games: PropTypes.array,
    }).isRequired,
};

export default graphql(GetGames)(Header);
