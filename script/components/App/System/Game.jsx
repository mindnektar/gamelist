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

    getGenres() {
        return this.props.genre ?
            this.props.genre.split(',').sort((a, b) => a.localeCompare(b)) :
            [];
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
                id={`game-${this.props.id}`}
            >
                <div
                    className="game__head"
                    onTouchTap={this.toggleExpanded}
                >
                    <div className="game__title">
                        {this.props.title}

                        {this.props.compilation &&
                            <span className="game__title-compilation">
                                ({this.props.compilation})
                            </span>
                        }

                        {this.props.dlcs.length > 0 &&
                            <span className="game__title-dlc-count">
                                {this.props.dlcs.length} DLC{this.props.dlcs.length !== 1 ? 's' : ''}
                            </span>
                        }
                    </div>

                    <div className="game__genre">
                        {this.getGenres().map(genre =>
                            <span key={genre}>{genre.trim()}</span>
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
                        {this.state.editing && this.props.editing ? (
                            <Editor
                                {...this.props}
                                controller={this.setEditorController}
                            />
                        ) : (
                            <div className="game__info">
                                {this.props.youTubeId ? (
                                    <iframe
                                        className="game__video"
                                        src={`https://www.youtube.com/embed/${this.props.youTubeId}`}
                                        type="text/html"
                                    />
                                ) : (
                                    <div className="game__video-placeholder" />
                                )}

                                <div className="game__description">
                                    {this.props.description}

                                    {this.props.dlcs.length > 0 &&
                                        <div className="game__dlcs">
                                            <div className="game__dlcs-header">DLCs</div>

                                            <div>
                                                {this.props.dlcs.map(dlc =>
                                                    <div className="game__dlc">
                                                        <div>{dlc.title}</div>

                                                        <Rating value={dlc.rating} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}

                        {this.props.editing &&
                            <div
                                className="game__edit-button material-icons"
                                onTouchTap={this.toggleEditing}
                            >
                                {this.state.editing ? 'close' : 'mode_edit'}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

Game.defaultProps = {
    compilation: '',
    description: '',
    developer: '',
    genre: '',
    rating: 0,
    release: null,
    youTubeId: null,
};

Game.propTypes = {
    compilation: PropTypes.string,
    description: PropTypes.string,
    developer: PropTypes.string,
    dlcs: PropTypes.array.isRequired,
    editing: PropTypes.bool.isRequired,
    genre: PropTypes.string,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number,
    release: PropTypes.string,
    saveGame: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    youTubeId: PropTypes.string,
};

export default connectWithRouter(
    (state, ownProps) => ({
        dlcs: Object.values(state.dlcs)
            .filter(dlc => dlc.parent === ownProps.id)
            .sort((a, b) => a.title.localeCompare(b.title)),
        editing: ownProps.location.pathname === '/edit',
    }),
    {
        saveGame,
    },
    Game
);