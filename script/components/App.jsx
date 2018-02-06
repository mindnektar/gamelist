import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { loadGames } from 'actions/games';
import { loadSystems } from 'actions/systems';
import { loadCategories } from 'actions/categories';
import Category from './App/Category';
import Header from './App/Header';

class App extends React.Component {
    state = {
        loaded: false,
    }

    componentWillMount() {
        Promise.all(
            [
                this.props.loadGames(),
                this.props.loadSystems(),
                this.props.loadCategories(),
            ],
            () => {
                this.setState({ loaded: true });
            }
        );
    }

    filteredCategories() {
        return this.props.categories
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    render() {
        return (
            <div className="gamelist">
                <Header />

                {this.filteredCategories().map(category =>
                    <Category
                        key={category.id}
                        {...category}
                    />
                )}
            </div>
        );
    }
}

App.propTypes = {
    loadCategories: PropTypes.func.isRequired,
    loadGames: PropTypes.func.isRequired,
    loadSystems: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
};

export default connectWithRouter(
    state => ({
        categories: state.categories,
    }),
    {
        loadCategories,
        loadGames,
        loadSystems,
    },
    App
);
