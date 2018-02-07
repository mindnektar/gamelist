import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { deleteGame, fillGameData } from 'actions/games';
import TextField from 'TextField';

const editableAttributes = [
    'title', 'compilation', 'rating', 'genre', 'developer', 'release', 'youTubeId', 'description',
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
                [type]: event.target.value,
            },
        });
    }

    render() {
        return (
            <div className="game__editor">
                <div className="game__editor-fields">
                    {Object.keys(this.state.attributes).map(type =>
                        <TextField
                            key={type}
                            label={type}
                            onChange={this.editHandler(type)}
                        >
                            {this.state.attributes[type] || ''}
                        </TextField>
                    )}

                    <TextField
                        label="GiantBomb index"
                        onChange={this.changeGiantBombIndex}
                    >
                        {this.state.giantBombIndex}
                    </TextField>
                </div>

                <div
                    className="game__editor-fill"
                    onTouchTap={this.fillGameData}
                >
                    Fill
                </div>

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
};

export default connectWithRouter(
    null,
    {
        deleteGame,
        fillGameData,
    },
    Editor
);
