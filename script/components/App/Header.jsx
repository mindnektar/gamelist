import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header__label">
                    List of completed games
                </div>

                <div className="header__total">
                    {Object.values(this.props.games).length} games
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    games: PropTypes.object.isRequired,
};

export default connectWithRouter(
    state => ({
        games: state.games,
    }),
    null,
    Header
);
