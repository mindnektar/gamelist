import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GetSystems from 'queries/systems/GetSystems.gql';
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
            [current]: this.props[current],
        }), {}),
        giantBombIndex: 0,
    }

    componentWillMount() {
        this.props.controller({
            getData: () => this.state.attributes,
        });
    }

    getSystems() {
        return this.props.data.systems
            .sort((a, b) => a.order - b.order)
            .map(system => ({ key: system._id, label: system.name }));
    }

    changeGiantBombIndex = (event) => {
        this.setState({ giantBombIndex: event.target.value });
    }

    deleteGame = () => {
        this.props.deleteGame(this.props._id);
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
        const label = type[0].toUpperCase() + type.substring(1);

        if (type === 'systemId') {
            return (
                <Select
                    items={this.getSystems()}
                    key={type}
                    label={label}
                    onChange={this.editHandler(type)}
                    value={this.state.attributes[type]}
                />
            );
        }

        return (
            <TextField
                key={type}
                label={label}
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
    data: PropTypes.shape({
        systems: PropTypes.array,
    }).isRequired,
    deleteGame: PropTypes.func.isRequired,
    fillGameData: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
};

export default graphql(GetSystems)(Editor);
