import Fastify from "fastify";
import FastifyWebsocket from "@fastify/websocket";
import WebSocket from "ws";

const fastify = Fastify()
await fastify.register(FastifyWebsocket)
// 
fastify.get('/ws', { websocket: true }, (socket, rep) => {
    socket.socket.removeAllListeners('close') // it make error
    socket.destroy()
})
await fastify.listen(3000)

// websocket
const ws = new WebSocket("ws://localhost:3000/ws")
ws.onopen = () => {
    console.log('websocket open')
    ws.close()
}
await new Promise(resolve => {
    ws.onclose = () => {
        console.log('websocket closed')
        resolve()
    }
})
try {

    // error expected
    await fastify.close()
} catch {
    console.log('closed') // unreachable
}

console.log('closed') // also unreachable