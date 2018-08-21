import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import graphqlQuery from 'graphqlQuery';
import GetGames from 'queries/games/GetGames.gql';
import GetSystems from 'queries/systems/GetSystems.gql';
import Select from 'Select';
import Group from './App/Group';
import Header from './App/Header';
import AddButton from './App/AddButton';

class App extends React.Component {
    state = {
        expandedGame: null,
        genreFilter: [],
        groupBy: 'systemId',
    }

    getGroups() {
        const games = [...this.props.games.data];

        if (!this.state.groupBy) {
            return [{ name: 'All games', games }];
        }

        const groups = games.reduce((result, current) => {
            const name = this.state.groupBy === 'systemId' ?
                current.system.name :
                current[this.state.groupBy];

            if (name) {
                result[name] = result[name] || { name, games: [], order: current.system.order };
                result[name].games.push(current);
            }

            return result;
        }, {});

        return Object.values(groups).sort((a, b) => {
            if (this.state.groupBy === 'rating') {
                return b.name - a.name;
            }

            if (this.state.groupBy === 'systemId') {
                return a.order - b.order;
            }

            if (typeof a.name === 'number') {
                return a.name - b.name;
            }

            return a.name.localeCompare(b.name);
        });
    }

    changeGrouping = (event) => {
        this.setState({ groupBy: event.target.value });
    }

    expandGame = (expandedGame) => {
        this.setState({ expandedGame });
    }

    toggleGenreFilter = (genre) => {
        const genreFilter = [...this.state.genreFilter];
        const index = genreFilter.indexOf(genre);

        if (index < 0) {
            genreFilter.push(genre);
        } else {
            genreFilter.splice(index, 1);
        }

        this.setState({ genreFilter });
    }

    render() {
        return (
            !!this.props.systems.data &&
            !!this.props.games.data && (
                <div className="gamelist">
                    <Header />

                    {this.props.location.pathname === '/edit' &&
                        <AddButton
                            expandGame={this.expandGame}
                        />
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
                            value={this.state.groupBy}
                        />
                    </div>

                    {this.getGroups().map(group => (
                        <Group
                            expandGame={this.expandGame}
                            expandedGame={this.state.expandedGame}
                            genreFilter={this.state.genreFilter}
                            groupBy={this.state.groupBy}
                            key={group.name}
                            toggleGenreFilter={this.toggleGenreFilter}
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
};

export default graphqlQuery([GetGames, GetSystems], withRouter(App));
