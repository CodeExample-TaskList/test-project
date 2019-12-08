import Koa from 'koa'
import Io from 'socket.io'
import { createServer } from 'http'
import sleep from 'sleep-promise'

import uuid from 'uuid/v4'
import { isNullOrUndefined } from 'util'

import Queue from '../src/utility/Queue'

const app = new Koa()
const server = createServer(app.callback())

const io = Io(server)

const ALL_TASKS = new Map()

const toDoIdQueue = new Queue()
const toDoPrioIdQueue = new Queue()

var currentActiveTaskId = null

io.on('connection', client => {
    //
    console.log('client connected')
    //add handler for getting a new task
    client.on('new_task', task => {
        //assign id, timestamp
        task.created_at = new Date().toISOString()
        task.id = uuid()
        //random time between 5s and 10s
        task.timeToFinish = (5 + Math.random() * 5) * 1000
        //
        ALL_TASKS.set(task.id, task)
        //if prio, add to prio queue, else normal queue
        task.isPriority
            ? toDoPrioIdQueue.push(task.id)
            : toDoIdQueue.push(task.id)
        //distribute to all clients
        io.emit('add_task', task)
        //
    })
    // send all tasks to the connected client
    client.emit('all_tasks', Array.from(ALL_TASKS.values()))
    //
})

async function run() {
    //
    //push eventually initialized tasks in their respective queues
    Array.from(ALL_TASKS.values()).forEach(task => {
        task.isCompleted
            ? console.log('task already complete')
            : task.isPriority
            ? toDoPrioIdQueue.push(task.id)
            : toDoIdQueue.push(task.id)
    })
    //
    while (true) {
        //get task by its id
        const currentActiveTask = ALL_TASKS.get(currentActiveTaskId)
        //if there is still an active task, sleep as long as it takes to finish, else 1 second
        const timeToSleep =
            isNullOrUndefined(currentActiveTask) ||
            isNullOrUndefined(currentActiveTask.timeToFinish)
                ? 1000
                : currentActiveTask.timeToFinish
        //
        console.log('Waiting for ' + timeToSleep)
        await sleep(timeToSleep)
        //
        if (isNullOrUndefined(currentActiveTask)) {
            //
            //console.log("no active task");
            //
            if (
                0 == toDoPrioIdQueue.data.length &&
                0 == toDoIdQueue.data.length
            ) {
                //
                //console.log("no task in any queue");
                //
                continue
                //
            } else if (0 < toDoPrioIdQueue.data.length) {
                //prioritize prio-queue
                //console.log("tasks in prioqueue");
                //
                currentActiveTaskId = toDoPrioIdQueue.pop()
                //
                continue
                //
            }
            //equivalent to
            //else if ( 0 < toDoIdQueue.data.length )
            else {
                //
                //console.log("no tasks in prio queue, but tasks in queue");
                //
                currentActiveTaskId = toDoIdQueue.pop()
                //
                continue
                //
            }
            //
        } else {
            //
            currentActiveTask.isCompleted = true
            delete currentActiveTask.timeToFinish
            //update task in main taskMap
            ALL_TASKS.set(currentActiveTaskId, currentActiveTask)
            //distribute completed task
            io.emit('add_task', currentActiveTask)
            //nullify active to signal ready-state
            currentActiveTaskId = null
            //
            continue
            //
        }
        //
    }
}

// Launch server and runner
server.listen(4000)
console.log('Server listening on port 4000')
;(async function() {
    await run()
})()
