import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { loadGames } from 'actions/games';
import { loadDlcs } from 'actions/dlcs';
import { loadSystems } from 'actions/systems';
import System from './App/System';
import Header from './App/Header';
import AddButton from './App/AddButton';

class App extends React.Component {
    state = {
        loaded: false,
    }

    componentWillMount() {
        Promise.all([
            this.props.loadGames(),
            this.props.loadDlcs(),
            this.props.loadSystems(),
        ]).then(() => {
            this.setState({ loaded: true });
        });
    }

    getSystems() {
        return Object.values(this.props.systems)
            .sort((a, b) => a.order - b.order);
    }

    render() {
        return this.state.loaded && (
            <div className="gamelist">
                <Header />

                {this.props.editing &&
                    <AddButton />
                }

                {this.getSystems().map(category =>
                    <System
                        key={category.id}
                        {...category}
                    />
                )}
            </div>
        );
    }
}

App.propTypes = {
    editing: PropTypes.bool.isRequired,
    loadDlcs: PropTypes.func.isRequired,
    loadGames: PropTypes.func.isRequired,
    loadSystems: PropTypes.func.isRequired,
    systems: PropTypes.object.isRequired,
};

export default connectWithRouter(
    (state, ownProps) => ({
        editing: ownProps.location.pathname === '/edit',
        systems: state.systems,
    }),
    {
        loadDlcs,
        loadGames,
        loadSystems,
    },
    App
);