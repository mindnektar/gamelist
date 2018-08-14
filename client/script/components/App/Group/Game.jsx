import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import connectWithRouter from 'hoc/connectWithRouter';
import scrollToGame from 'helpers/scrollToGame';
import { saveGame } from 'actions/games';
import { toggleGame, toggleGenreFilter } from 'actions/ui';
import Rating from './Game/Rating';
import Editor from './Game/Editor';

class Game extends React.Component {
    state = {
        editing: false,
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
        this.props.toggleGame(this.props._id);
    }

    toggleEditing = () => {
        const editing = !this.state.editing;

        if (!editing) {
            this.props.saveGame(this.props._id, this.editorController.getData()).then(() => {
                scrollToGame(this.props._id);
            });
        }

        this.setState({ editing });
    }

    toggleGenreFilterHandler = genre => (event) => {
        event.stopPropagation();
        this.props.toggleGenreFilter(genre);
    }

    render() {
        return (
            <div
                className={classNames(
                    'game',
                    {
                        'game--expanded': this.props.expanded,
                        'game--editing': this.state.editing,
                    }
                )}
                id={`game-${this.props._id}`}
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
                            <span
                                className={classNames(
                                    'game__genre-item',
                                    { 'game__genre-item--active': this.props.genreFilter.includes(genre) }
                                )}
                                key={genre}
                                onTouchTap={this.toggleGenreFilterHandler(genre)}
                            >
                                {genre.trim()}
                            </span>
                        )}
                    </div>

                    {this.props.groupBy !== 'system' &&
                        <div className="game__system">
                            {this.props.systems[this.props.systemId].name}
                        </div>
                    }

                    {this.props.groupBy !== 'developer' &&
                        <div className="game__developer">
                            {this.props.developer}
                        </div>
                    }

                    {this.props.groupBy !== 'release' &&
                        <div className="game__release">
                            {this.props.release}
                        </div>
                    }

                    {this.props.groupBy !== 'rating' &&
                        <Rating value={this.props.rating / 10} />
                    }
                </div>

                <TransitionGroup>
                    {this.props.expanded &&
                        <CSSTransition
                            classNames="game"
                            key={this.props._id}
                            mountOnEnter
                            timeout={{
                                enter: 300,
                                exit: 300,
                            }}
                            unmountOnExit
                        >
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
                                                            <div
                                                                className="game__dlc"
                                                                key={dlc._id}
                                                            >
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
                        </CSSTransition>
                    }
                </TransitionGroup>
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
    _id: PropTypes.string.isRequired,
    compilation: PropTypes.string,
    description: PropTypes.string,
    developer: PropTypes.string,
    dlcs: PropTypes.array.isRequired,
    editing: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    genre: PropTypes.string,
    genreFilter: PropTypes.array.isRequired,
    groupBy: PropTypes.string.isRequired,
    rating: PropTypes.number,
    release: PropTypes.number,
    saveGame: PropTypes.func.isRequired,
    systemId: PropTypes.string.isRequired,
    systems: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    toggleGame: PropTypes.func.isRequired,
    toggleGenreFilter: PropTypes.func.isRequired,
    youTubeId: PropTypes.string,
};

export default connectWithRouter(
    (state, ownProps) => ({
        editing: ownProps.location.pathname === '/edit',
        expanded: state.ui.expandedGame === ownProps._id,
        genreFilter: state.ui.genreFilter,
        groupBy: state.ui.groupBy,
        systems: state.systems,
    }),
    {
        saveGame,
        toggleGame,
        toggleGenreFilter,
    },
    Game
);
