import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import connectWithRouter from 'hoc/connectWithRouter';
import { saveGame } from 'actions/games';
import Rating from './Game/Rating';
import Editor from './Game/Editor';

class Game extends React.Component {
    state = {
        editing: false,
        expanded: false,
    }

    setEditorController = (controller) => {
        this.editorController = controller;
    }

    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    toggleEditing = () => {
        const editing = !this.state.editing;

        if (!editing) {
            this.props.saveGame(this.props.id, this.editorController.getData());
        }

        this.setState({ editing });
    }

    render() {
        return (
            <div
                className={classNames(
                    'game',
                    {
                        'game--expanded': this.state.expanded,
                        'game--editing': this.state.editing,
                    }
                )}
            >
                <div
                    className="game__head"
                    onTouchTap={this.toggleExpanded}
                >
                    <div className="game__title">
                        {this.props.title}
                    </div>

                    <div className="game__genre">
                        {this.props.genre.split(',').map(genre =>
                            <span key={genre}>{genre}</span>
                        )}
                    </div>

                    <div className="game__developer">
                        {this.props.developer}
                    </div>

                    <div className="game__release">
                        {this.props.release}
                    </div>

                    <Rating value={this.props.rating} />
                </div>

                {this.state.expanded &&
                    <div className="game__body">
                        {this.state.editing ? (
                            <Editor
                                {...this.props}
                                controller={this.setEditorController}
                            />
                        ) : (
                            <div className="game__info">
                                {this.props.youTubeId ? (
                                    <iframe
                                        className="game__video"
                                        src={`http://www.youtube.com/embed/${this.props.youTubeId}`}
                                        type="text/html"
                                    />
                                ) : (
                                    <div className="game__video-placeholder" />
                                )}

                                <div className="game__description">
                                    {this.props.description}
                                </div>
                            </div>
                        )}

                        <div
                            className="game__edit-button material-icons"
                            onTouchTap={this.toggleEditing}
                        >
                            {this.state.editing ? 'close' : 'mode_edit'}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Game.defaultProps = {
    description: '',
    release: null,
    youTubeId: null,
};

Game.propTypes = {
    description: PropTypes.string,
    developer: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    release: PropTypes.string,
    saveGame: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    youTubeId: PropTypes.string,
};

export default connectWithRouter(
    null,
    {
        saveGame,
    },
    Game
);
