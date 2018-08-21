import React from 'react';
import PropTypes from 'prop-types';
import graphqlQuery from 'graphqlQuery';
import GetSystems from 'queries/systems/GetSystems.gql';
import GetGames from 'queries/games/GetGames.gql';
import DeleteGame from 'queries/games/DeleteGame.gql';
import TextField from 'TextField';
import Button from 'Button';
import Select from 'Select';

const editableAttributes = [
    'title', 'compilation', 'systemId', 'rating', 'genre', 'developer', 'release', 'youTubeId',
    'description',
];

class Editor extends React.Component {
    state = {
        attributes: editableAttributes.reduce((result, current) => ({
            ...result,
            [current]: current === 'systemId' ? this.props.system._id : this.props[current],
        }), {}),
        giantBombIndex: 0,
    }

    componentWillMount() {
        this.props.controller({
            getData: () => this.state.attributes,
        });
    }

    getSystems() {
        return [...this.props.systems.data]
            .sort((a, b) => a.order - b.order)
            .map(system => ({ key: system._id, label: system.name }));
    }

    changeGiantBombIndex = (event) => {
        this.setState({ giantBombIndex: event.target.value });
    }

    deleteGame = () => {
        this.props.deleteGame({
            variables: {
                _id: this.props._id,
            },
            optimisticResponse: {
                __typename: 'Mutation',
                deleteGame: {
                    __typename: 'Game',
                    _id: this.props._id,
                },
            },
            update: (cache, { data: { deleteGame } }) => {
                cache.writeQuery({
                    query: GetGames,
                    data: {
                        games: [
                            ...cache.readQuery({ query: GetGames }).games
                                .filter(game => game._id !== deleteGame._id),
                        ],
                    },
                });
            },
        });
    }

    fillGameData = () => {
        this.props.fillGameData(
            this.props._id,
            parseInt(this.state.giantBombIndex, 10)
        ).then((game) => {
            this.setState({
                attributes: {
                    ...this.state.attributes,
                    ...editableAttributes.reduce((result, current) => ({
                        ...result,
                        [current]: game[current],
                    }), {}),
                },
            });
        });
    }

    blurHandler = type => (event) => {
        this.setState({
            attributes: {
                ...this.state.attributes,
                [type]: isNaN(event.target.value) ?
                    event.target.value :
                    parseFloat(event.target.value),
            },
        });
    }

    editHandler = type => (event) => {
        this.setState({
            attributes: {
                ...this.state.attributes,
                [type]: event.target.value,
            },
        });
    }

    renderInput = (type) => {
        if (type === 'systemId') {
            return (
                <Select
                    items={this.getSystems()}
                    key={type}
                    label={type}
                    onChange={this.editHandler(type)}
                    value={this.state.attributes[type]}
                />
            );
        }

        return (
            <TextField
                key={type}
                label={type}
                onBlur={this.blurHandler(type)}
                onChange={this.editHandler(type)}
            >
                {this.state.attributes[type] || ''}
            </TextField>
        );
    }

    render() {
        return (
            <div className="game__editor">
                <div className="game__editor-fields">
                    {Object.keys(this.state.attributes).map(this.renderInput)}

                    <TextField
                        label="GiantBomb index"
                        onChange={this.changeGiantBombIndex}
                    >
                        {this.state.giantBombIndex}
                    </TextField>
                </div>

                <Button onClick={this.fillGameData}>Fill</Button>

                <div
                    className="game__delete-button material-icons"
                    onClick={this.deleteGame}
                >
                    delete
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    controller: PropTypes.func.isRequired,
    system: PropTypes.object.isRequired,
    systems: PropTypes.object.isRequired,
    deleteGame: PropTypes.func.isRequired,
    fillGameData: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
};

export default graphqlQuery([GetSystems, DeleteGame], Editor);
