const fs = require('fs')
const express = require('express');
const app = express();
const status = require('express-status-monitor');

app.use(status());

// file transfer in chunks using stream method 
app.get('/getfile', (req, res) => {
    const stream = fs.createReadStream('./data.txt','utf-8');
    stream.on('data',(chunk)=>res.write(chunk));
    stream.on('end',()=>res.end());
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})