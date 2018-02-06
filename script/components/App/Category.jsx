import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import System from './Category/System';

class Category extends React.Component {
    filteredSystems() {
        return Object.values(this.props.systems)
            .filter(system => system.category === this.props.id)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    render() {
        return (
            <div className="category">
                <div className="category__label">
                    {this.props.name}
                </div>

                {this.filteredSystems().map(system =>
                    <System
                        key={system.id}
                        {...system}
                    />
                )}
            </div>
        );
    }
}

Category.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    systems: PropTypes.object.isRequired,
};

export default connectWithRouter(
    state => ({
        systems: state.systems,
    }),
    null,
    Category
);
