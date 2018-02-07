import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { loadGames } from 'actions/games';
import { loadDlcs } from 'actions/dlcs';
import { loadSystems } from 'actions/systems';
import { changeGrouping } from 'actions/ui';
import Select from 'Select';
import Group from './App/Group';
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

    getGroups() {
        if (this.props.groupBy === 'system') {
            return Object.values(this.props.systems)
                .sort((a, b) => a.order - b.order);
        }

        return Object.values(this.props.games)
            .reduce((result, current) => {
                if (!result.find(group => `${group.name}` === `${current[this.props.groupBy]}`)) {
                    return [
                        ...result,
                        {
                            id: current[this.props.groupBy],
                            name: current[this.props.groupBy],
                        },
                    ];
                }

                return result;
            }, [])
            .sort((a, b) => {
                if (typeof a.name === 'number') {
                    if (this.props.groupBy === 'rating') {
                        return b.name - a.name;
                    }

                    return a.name - b.name;
                }

                return a.name.localeCompare(b.name);
            });
    }

    changeGrouping = (event) => {
        this.props.changeGrouping(event.target.value);
    }

    render() {
        return this.state.loaded && (
            <div className="gamelist">
                <Header />

                {this.props.editing &&
                    <AddButton />
                }

                <div className="gamelist__grouping">
                    <Select
                        items={[
                            { key: 'system', label: 'System' },
                            { key: 'developer', label: 'Developer' },
                            { key: 'release', label: 'Release year' },
                            { key: 'rating', label: 'Rating' },
                        ]}
                        label="Group by"
                        onChange={this.changeGrouping}
                        value={this.props.groupBy}
                    />
                </div>

                {this.getGroups().map(group =>
                    <Group
                        key={group.id}
                        {...group}
                    />
                )}
            </div>
        );
    }
}

App.propTypes = {
    changeGrouping: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    games: PropTypes.object.isRequired,
    groupBy: PropTypes.string.isRequired,
    loadDlcs: PropTypes.func.isRequired,
    loadGames: PropTypes.func.isRequired,
    loadSystems: PropTypes.func.isRequired,
    systems: PropTypes.object.isRequired,
};

export default connectWithRouter(
    (state, ownProps) => ({
        editing: ownProps.location.pathname === '/edit',
        games: state.games,
        groupBy: state.ui.groupBy,
        systems: state.systems,
    }),
    {
        changeGrouping,
        loadDlcs,
        loadGames,
        loadSystems,
    },
    App
);
