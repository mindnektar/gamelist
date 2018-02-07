import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';

class Select extends React.Component {
    render() {
        return (
            <div className="ui-select">
                <select
                    onChange={this.props.onChange}
                    value={this.props.value}
                >
                    {this.props.items.map(item =>
                        <option
                            key={item.key}
                            value={item.key}
                        >
                            {item.label}
                        </option>
                    )}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default connectWithRouter(
    null,
    null,
    Select
);
