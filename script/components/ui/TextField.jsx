import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {
    render() {
        return (
            <div className="ui-text-field">
                <div className="ui-text-field__label">
                    {this.props.label}
                </div>

                <input
                    className="ui-text-field__input"
                    onBlur={this.props.onBlur}
                    onChange={this.props.onChange}
                    type="text"
                    value={this.props.children}
                />
            </div>
        );
    }
}

TextField.defaultProps = {
    children: '',
    onBlur: null,
};

TextField.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]),
    label: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

export default TextField;
