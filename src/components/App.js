import React from 'react'

import AppBar from '@material-ui/core/AppBar'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import TaskForm from './TaskForm'
import TaskList from './TaskList'

/**
 * Main class of this application
 */
class App extends React.Component {
    //
    constructor(props) {
        //
        super(props)
        //
    }

    render() {
        //
        return (
            <div id="wrapper">
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6">TaskList</Typography>
                    </Toolbar>
                </AppBar>
                <TaskForm
                    sendNewTaskToServer={this.props.sendNewTaskToServer}
                />
                <TaskList sortedTasks={this.props.sortedTasks} />
            </div>
        ) //return
        //
    } //render
    //
} //class

export default App
