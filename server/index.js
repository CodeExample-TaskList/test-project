import Koa from "koa"
import Io from "socket.io"
import { createServer } from "http"
import sleep from "sleep-promise"

const app = new Koa()
const server = createServer(app.callback())
const io = Io(server)

// TODO: implement socket io
io.on("connection", client => {
  console.log("client connected", client)
  // TODO: send all tasks to the connected client
  // client.emit("all_tasks", [])
})

async function run() {
  while (true) {
    await sleep(1000)
    console.log("Checking tasks...")
    // TODO: check tasks
    // TODO: emit updates via io.sockets.emit("any_event_type_name", data)
  }
}

// Launch server and runner
server.listen(4000)
console.log("Server listening on port 4000")
;(async function() {
  await run()
})()
