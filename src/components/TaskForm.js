import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CircularProgress from '@material-ui/core/CircularProgress'

import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'

import getBoolean from '../utility/getBoolean'

/**
 * required props:
 *
 * sendNewTaskToServer : (name : string, isPriority) => void
 */
class TaskForm extends React.Component {
    //
    constructor(props) {
        //
        super(props)
        //
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePriority = this.handleChangePriority.bind(this)
        this.openForm = this.openForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
        //
        this.state = {
            formHidden: true,
            name: '',
            isPriority: false,
        }
        //
    }

    submitForm() {
        //
        if (this.state.name.length > 0) {
            this.props.sendNewTaskToServer(
                this.state.name,
                this.state.isPriority
            )
            this.setState({
                formHidden: true,
                name: '',
                isPriority: false,
            })
            //
            return
            //
        } else {
            //
            return
            //
        }
        //
    }

    openForm() {
        //
        this.setState({
            formHidden: false,
        })
        //
    }

    handleChangeName(event) {
        //
        this.setState({
            name: event.target.value.trim(),
        })
        //
    }

    handleChangePriority(event) {
        //
        this.setState({
            isPriority: !getBoolean(event.target.value),
        })
        //
    }

    render() {
        //
        return (
            <FormControl>
                {this.state.formHidden ? (
                    <input
                        type="button"
                        value="Create new task"
                        onClick={this.openForm}
                    />
                ) : (
                    <div>
                        <input
                            type="checkbox"
                            id="priorityCheckBox"
                            style={{ visibility: 'hidden' }}
                            value={this.state.isPriority}
                            onChange={this.handleChangePriority}
                        />
                        <ListItem>
                            <label htmlFor="priorityCheckBox">
                                <ListItemIcon>
                                    {getBoolean(this.state.isPriority) ? (
                                        <StarIcon color="primary" />
                                    ) : (
                                        <StarBorderOutlinedIcon color="disabled" />
                                    )}
                                </ListItemIcon>
                                <ListItemIcon style={{ visibility: 'hidden' }}>
                                    <CircularProgress />
                                </ListItemIcon>
                            </label>
                            <label htmlFor="nameInput">
                                <input
                                    type="text"
                                    id="nameInput"
                                    autoFocus
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                    style={
                                        this.state.name.trim().length > 0
                                            ? {}
                                            : {
                                                  backgroundColor:
                                                      'rgba(128,128,0,0.3)',
                                                  borderColor: 'yellow',
                                              }
                                    }
                                />
                            </label>
                            <input
                                type="button"
                                value="Send to server"
                                onClick={this.submitForm}
                            />
                        </ListItem>
                        <hr />
                    </div>
                )}
            </FormControl>
        ) //return
        //
    } //render
}

export default TaskForm
