import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import graphqlQuery from 'graphqlQuery';
import GetGames from 'queries/games/GetGames.gql';
import GetSystems from 'queries/systems/GetSystems.gql';
import GetUi from 'queries/ui/GetUi.gql';
import UpdateUi from 'queries/ui/UpdateUi.gql';
import Select from 'Select';
import Group from './App/Group';
import Header from './App/Header';
import AddButton from './App/AddButton';

class App extends React.Component {
    getGroups() {
        const games = [...this.props.games.data];

        if (!this.props.ui.data.groupBy) {
            return [{ name: 'All games', games }];
        }

        const groups = games.reduce((result, current) => {
            const name = this.props.ui.data.groupBy === 'systemId' ?
                current.system.name :
                current[this.props.ui.data.groupBy];

            if (name) {
                result[name] = result[name] || { name, games: [] };
                result[name].games.push(current);
            }

            return result;
        }, {});

        return Object.values(groups).sort((a, b) => {
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
        this.props.updateUi({
            variables: {
                input: {
                    groupBy: event.target.value,
                },
            },
        });
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
                                { key: 'systemId', label: 'System' },
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

                    {this.getGroups().map(group => (
                        <Group
                            key={group.name}
                            {...group}
                        />
                    ))}
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
    updateUi: PropTypes.func.isRequired,
};

export default graphqlQuery([GetGames, GetSystems, GetUi, UpdateUi], withRouter(App));
