import Koa from "koa"
import Router from "koa-router"
import Io from "socket.io"
import { createServer } from "http"

const app = new Koa()
const router = new Router()
const server = createServer(app.callback())
const io = Io(server)

// TODO implement socket io
io.on("connection", () => {
  console.log("client connected")
  io.emit("event_type_here", "testmessage")
})

// TODO implement REST endpoint
router.get("/", async ctx => {
  ctx.body = "test"
})

app.use(router.routes())

server.listen(4000)
console.log("Server listening on port 4000")
