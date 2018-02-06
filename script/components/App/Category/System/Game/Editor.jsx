import React from 'react';
import PropTypes from 'prop-types';
import connectWithRouter from 'hoc/connectWithRouter';
import { fillGameData } from 'actions/games';
import TextField from 'TextField';

const editableAttributes = [
    'title', 'rating', 'genre', 'developer', 'release', 'youTubeId', 'description',
];

class Editor extends React.Component {
    state = editableAttributes.reduce((result, current) => ({
        ...result,
        [current]: this.props[current],
    }), {})

    componentWillMount() {
        this.props.controller({
            getData: () => this.state,
        });
    }

    fillHandler = giantBombIndex => () => {
        this.props.fillGameData(this.props.id, giantBombIndex).then((game) => {
            this.setState(editableAttributes.reduce((result, current) => ({
                ...result,
                [current]: game[current],
            }), {}));
        });
    }

    editHandler = type => (event) => {
        this.setState({ [type]: event.target.value });
    }

    render() {
        return (
            <div className="game__editor">
                <div className="game__editor-fields">
                    {Object.keys(this.state).map(type =>
                        <TextField
                            key={type}
                            label={type}
                            onChange={this.editHandler(type)}
                        >
                            {this.state[type] || ''}
                        </TextField>
                    )}
                </div>

                <div
                    className="game__editor-fill"
                    onTouchTap={this.fillHandler(0)}
                >
                    Fill
                </div>

                <div
                    className="game__editor-fill"
                    onTouchTap={this.fillHandler(1)}
                >
                    Fill (alternative)
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    controller: PropTypes.func.isRequired,
    fillGameData: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default connectWithRouter(
    null,
    {
        fillGameData,
    },
    Editor
);
