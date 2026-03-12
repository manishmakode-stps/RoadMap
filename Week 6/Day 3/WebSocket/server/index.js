import express from 'express';
import {WebSocketServer} from 'ws';
import path from 'path';

const app = express();
const port = 8080;
const __dirname = path.resolve();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.html');
});
const server = app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

const wss = new WebSocketServer({server})

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
        console.log("Received: " + message);
        console.log(ws);
        ws.send(message.toString());
        
    })
})