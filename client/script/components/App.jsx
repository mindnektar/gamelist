import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import GetGames from 'queries/games/GetGames.gql';
import Select from 'Select';
import Group from './App/Group';
import Header from './App/Header';
import AddButton from './App/AddButton';

class App extends React.Component {
    getGroups() {
        if (!this.props.data.ui.groupBy) {
            return [{ _id: '', name: 'All games' }];
        }

        if (this.props.data.ui.groupBy === 'systemId') {
            return this.props.data.games
                .reduce((result, current) => {
                    if (result.find(system => system._id === current.system._id)) {
                        return result;
                    }

                    return [...result, current.system];
                }, [])
                .sort((a, b) => a.order - b.order);
        }

        return this.props.data.games
            .reduce((result, current) => {
                if (!result.find(group => `${group.name}` === `${current[this.props.data.ui.groupBy]}`)) {
                    return [
                        ...result,
                        {
                            _id: current[this.props.data.ui.groupBy],
                            name: current[this.props.data.ui.groupBy],
                        },
                    ];
                }

                return result;
            }, [])
            .sort((a, b) => {
                if (typeof a.name === 'number') {
                    if (this.props.data.ui.groupBy === 'rating') {
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
        return !this.props.data.loading && (
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
                        value={this.props.data.ui.groupBy}
                    />
                </div>

                {this.getGroups().map(group =>
                    <Group
                        key={group._id}
                        {...group}
                    />
                )}
            </div>
        );
    }
}

App.propTypes = {
    data: PropTypes.shape({
        games: PropTypes.array,
        ui: PropTypes.object,
        loading: PropTypes.bool.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default graphql(GetGames)(withRouter(App));
