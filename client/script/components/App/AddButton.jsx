import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import graphqlQuery from 'graphqlQuery';
import GetSystems from 'queries/systems/GetSystems.gql';
import scrollToGame from 'helpers/scrollToGame';
import Button from 'Button';
import TextField from 'TextField';
import Select from 'Select';

class AddButton extends React.Component {
    state = {
        expanded: false,
        systemId: this.getSystems()[0].key,
        title: '',
    }

    getSystems() {
        return this.props.systems.data
            .sort((a, b) => a.order - b.order)
            .map(system => ({ key: system._id, label: system.name }));
    }

    changeSystem = (event) => {
        this.setState({ systemId: event.target.value });
    }

    changeTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    save = () => {
        this.toggleExpanded();

        this.props.createGame(this.state.title, this.state.systemId).then((game) => {
            scrollToGame(game._id);

            this.props.toggleGame(game._id);
        });
    }

    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (
            <div
                className={classNames(
                    'add-button',
                    { 'add-button--expanded': this.state.expanded }
                )}
            >
                <div
                    className="add-button__head"
                    onClick={this.toggleExpanded}
                >
                    Add game
                </div>

                <div className="add-button__body">
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
                            value={this.state.systemId}
                        />
                    </div>

                    <Button onClick={this.save}>
                        Save
                    </Button>
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

export default graphqlQuery(GetSystems, AddButton);
