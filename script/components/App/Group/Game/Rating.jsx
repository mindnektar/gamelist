import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';

class Rating extends React.Component {
    render() {
        return (
            <div className="rating">
                <div
                    className="rating__inner"
                    style={{ width: `${this.props.value * 10}%` }}
                />

                <div className="rating__text">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
};

export default connectWithRouter(
    null,
    null,
    Rating
);
