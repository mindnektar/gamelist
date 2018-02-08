import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { deleteGame, fillGameData } from 'actions/games';
import TextField from 'TextField';
import Button from 'Button';
import Select from 'Select';

const editableAttributes = [
    'title', 'compilation', 'system', 'rating', 'genre', 'developer', 'release', 'youTubeId',
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
        return Object.values(this.props.systems)
            .sort((a, b) => a.order - b.order)
            .map(system => ({ key: system.id, label: system.name }));
    }

    changeGiantBombIndex = (event) => {
        this.setState({ giantBombIndex: event.target.value });
    }

    deleteGame = () => {
        this.props.deleteGame(this.props.id);
    }

    fillGameData = () => {
        this.props.fillGameData(
            this.props.id,
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

    editHandler = type => (event) => {
        this.setState({
            attributes: {
                ...this.state.attributes,
                [type]: isNaN(event.target.value) ?
                    event.target.value :
                    parseInt(event.target.value, 10),
            },
        });
    }

    renderInput = (type) => {
        const label = type[0].toUpperCase() + type.substring(1);

        if (type === 'system') {
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

                <Button onTouchTap={this.fillGameData}>Fill</Button>

                <div
                    className="game__delete-button material-icons"
                    onTouchTap={this.deleteGame}
                >
                    delete
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    controller: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    fillGameData: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    systems: PropTypes.object.isRequired,
};

export default connectWithRouter(
    state => ({
        systems: state.systems,
    }),
    {
        deleteGame,
        fillGameData,
    },
    Editor
);
