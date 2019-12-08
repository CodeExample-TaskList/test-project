import React from 'react'

import List from '@material-ui/core/List'

import Task from './Task'

/**
 *
 */
class TaskList extends React.Component {
    constructor(props) {
        //
        super(props)
        //
        this.state = {}
        //
    }

    render() {
        //
        return (
            <List position="relative" component="nav">
                {this.props.sortedTasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </List>
        ) //return
        //
    } //render
}

export default TaskList
