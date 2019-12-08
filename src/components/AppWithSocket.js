import React from 'react'

import socketWithPortAndListeners from './Socket'

/**
 * Wrapper for an App
 * @param {} App
 */
const withSocket = App => {
    //
    return class AppWithSocket extends React.Component {
        constructor(props) {
            //
            super(props)
            //
            this.receiveTaskFromServer = this.receiveTaskFromServer.bind(this)
            this.receiveMultipleTasksFromServer = this.receiveMultipleTasksFromServer.bind(
                this
            )
            this.sendNewTaskToServer = this.sendNewTaskToServer.bind(this)
            //
            const socket = socketWithPortAndListeners(4000, [
                ['all_tasks', this.receiveMultipleTasksFromServer],
                ['add_task', this.receiveTaskFromServer],
            ])
            //
            this.state = {
                socket: socket,
                sortedTasks: [],
                taskMap: new Map(),
            }
            //
        }

        sendNewTaskToServer(name, isPriority) {
            //
            const task = {}
            task.name = name
            task.isPriority = isPriority
            //
            this.state.socket.emit('new_task', task)
            //
        }

        receiveMultipleTasksFromServer(tasks) {
            //
            tasks.forEach(task => this.receiveTaskFromServer(task))
            //
        }

        receiveTaskFromServer(task) {
            //
            const tempMap = new Map(this.state.taskMap)
            //
            tempMap.set(task.id, task)
            //
            const sortedTasks = Array.from(tempMap.values()).sort(
                (task1, task2) => {
                    return (
                        new Date(task2.created_at) - new Date(task1.created_at)
                    )
                }
            )
            //
            this.setState({ sortedTasks: sortedTasks, taskMap: tempMap })
            //
        }

        render() {
            console.log('before propping', this.state.taskMap)
            //
            return (
                <App
                    sortedTasks={this.state.sortedTasks}
                    sendNewTaskToServer={this.sendNewTaskToServer}
                    {...this.props}
                />
            )
            //
        }
    }
}

export default withSocket
