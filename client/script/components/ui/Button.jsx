import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    render() {
        return (
            <div className="ui-button">
                <button onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
