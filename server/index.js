import Koa from "koa"
import Io from "socket.io"
import { createServer } from "http"

const app = new Koa()
const server = createServer(app.callback())
const io = Io(server)

// TODO implement socket io
io.on("connection", () => {
  console.log("client connected")
  // io.emit("broadcast", "testmessage")
})

// TODO implement REST endpoint
// ...

server.listen(4000)
console.log("Server listening on port 4000")
