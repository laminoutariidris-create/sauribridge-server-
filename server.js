const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.get('/', (req,res)=>res.send('SauriBridge Server Online'));
let clients = new Set();
wss.on('connection', (ws)=>{
  clients.add(ws);
  ws.on('message', (data)=>{
    clients.forEach(c=>{ if(c!==ws && c.readyState===1) c.send(data.toString()); });
  });
  ws.on('close', ()=>clients.delete(ws));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>console.log('Running on '+PORT));
