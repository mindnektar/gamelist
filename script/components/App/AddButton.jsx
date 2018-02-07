import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollToElement from 'scroll-to-element';
import connectWithRouter from 'hoc/connectWithRouter';
import { createGame } from 'actions/games';
import { toggleGame } from 'actions/ui';
import Button from 'Button';
import TextField from 'TextField';
import Select from 'Select';

class AddButton extends React.Component {
    state = {
        expanded: false,
        system: 13,
        title: '',
    }

    getSystems() {
        return Object.values(this.props.systems)
            .sort((a, b) => a.order - b.order)
            .map(system => ({ key: system.id, label: system.name }));
    }

    changeSystem = (event) => {
        this.setState({ system: parseInt(event.target.value, 10) });
    }

    changeTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    save = () => {
        this.toggleExpanded();

        this.props.createGame(this.state.title, this.state.system).then((game) => {
            scrollToElement(`#game-${game.id}`, { ease: 'inOutQuad', align: 'middle' });

            this.props.toggleGame(game.id);
        });
    }

    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (
            <div className="add-button">
                <div
                    className={classNames(
                        'game',
                        { 'game--expanded': this.state.expanded }
                    )}
                >
                    <div
                        className="game__head"
                        onTouchTap={this.toggleExpanded}
                    >
                        Add game
                    </div>

                    {this.state.expanded &&
                        <div className="game__body">
                            <div className="add-button__fields">
                                <TextField
                                    label="Title"
                                    onChange={this.changeTitle}
                                >
                                    {this.state.title}
                                </TextField>

                                <Select
                                    items={this.getSystems()}
                                    label="System"
                                    onChange={this.changeSystem}
                                    value={this.state.system}
                                />
                            </div>

                            <Button onTouchTap={this.save}>
                                Save
                            </Button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

AddButton.propTypes = {
    createGame: PropTypes.func.isRequired,
    systems: PropTypes.object.isRequired,
    toggleGame: PropTypes.func.isRequired,
};

export default connectWithRouter(
    state => ({
        systems: state.systems,
    }),
    {
        createGame,
        toggleGame,
    },
    AddButton
);
