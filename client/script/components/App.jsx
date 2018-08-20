import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import graphqlQuery from 'graphqlQuery';
import GetGames from 'queries/games/GetGames.gql';
import GetSystems from 'queries/systems/GetSystems.gql';
import GetUi from 'queries/ui/GetUi.gql';
import Select from 'Select';
import Group from './App/Group';
import Header from './App/Header';
import AddButton from './App/AddButton';

class App extends React.Component {
    getGroups() {
        if (!this.props.ui.data.groupBy) {
            return [{ _id: '', name: 'All games' }];
        }

        if (this.props.ui.data.groupBy === 'systemId') {
            return [...this.props.systems.data].sort((a, b) => a.order - b.order);
        }

        return this.props.games.data
            .reduce((result, current) => {
                if (!result.find(group => `${group.name}` === `${current[this.props.ui.data.groupBy]}`)) {
                    return [
                        ...result,
                        {
                            _id: current[this.props.ui.data.groupBy],
                            name: current[this.props.ui.data.groupBy],
                        },
                    ];
                }

                return result;
            }, [])
            .sort((a, b) => {
                if (typeof a.name === 'number') {
                    if (this.props.ui.data.groupBy === 'rating') {
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
        return (
            !!this.props.systems.data &&
            !!this.props.games.data &&
            !!this.props.ui.data && (
                <div className="gamelist">
                    <Header />

                    {this.props.location.pathname === '/edit' &&
                        <AddButton />
                    }

                    <div className="gamelist__grouping">
                        <Select
                            items={[
                                { key: 'system', label: 'System' },
                                { key: 'developer', label: 'Developer' },
                                { key: 'release', label: 'Release year' },
                                { key: 'rating', label: 'Rating' },
                                { key: '', label: '<none>' },
                            ]}
                            label="Group by"
                            onChange={this.changeGrouping}
                            value={this.props.ui.data.groupBy}
                        />
                    </div>

                    {this.getGroups().map(group =>
                        <Group
                            key={group._id}
                            {...group}
                        />
                    )}
                </div>
            )
        );
    }
}

App.propTypes = {
    games: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    systems: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default graphqlQuery([GetGames, GetSystems, GetUi], withRouter(App));
