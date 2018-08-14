import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';

class Button extends React.Component {
    render() {
        return (
            <div className="ui-button">
                <button onTouchTap={this.props.onTouchTap}>
                    {this.props.children}
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func.isRequired,
};

export default connectWithRouter(
    null,
    null,
    Button
);
