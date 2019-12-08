import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'

import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import DoneIcon from '@material-ui/icons/Done'

import getBoolean from '../utility/getBoolean'

class Task extends React.Component {
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
            <ListItem key={this.props.task.id}>
                <ListItemIcon>
                    {getBoolean(this.props.task.isPriority) ? (
                        <StarIcon color="primary" />
                    ) : (
                        <StarBorderOutlinedIcon color="disabled" />
                    )}
                </ListItemIcon>
                <ListItemIcon>
                    {getBoolean(this.props.task.isCompleted) ? (
                        <DoneIcon color="primary" />
                    ) : (
                        <CircularProgress />
                    )}
                </ListItemIcon>
                <ListItemText primary={this.props.task.name} />
            </ListItem>
        ) //return
        //
    } //render
}

export default Task
