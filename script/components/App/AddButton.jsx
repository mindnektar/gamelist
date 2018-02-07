import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollToElement from 'scroll-to-element';
import connectWithRouter from 'hoc/connectWithRouter';
import { createGame } from 'actions/games';
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
                            <TextField
                                label="title"
                                onChange={this.changeTitle}
                            >
                                {this.state.title}
                            </TextField>

                            <Select
                                items={this.getSystems()}
                                onChange={this.changeSystem}
                                value={this.state.system}
                            />

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
};

export default connectWithRouter(
    state => ({
        systems: state.systems,
    }),
    {
        createGame,
    },
    AddButton
);