import io from 'socket.io-client'

/**
 * creates new websocket via socket.io
 *
 * @param {*} port connecting to this port on document.location.hostname
 * @param {*} listeners array of [eventName, functionToExecuteOnEvent]
 */
const socketWithPortAndListeners = (port, listeners) => {
    //
    const socket = io(
        'http://' + document.location.hostname + ':' + port.toString()
    )
    //
    listeners.map(([eventName, eventHandler]) => {
        socket.on(eventName, function(data) {
            eventHandler(data)
        })
    })
    //
    return socket
}

export default socketWithPortAndListeners
