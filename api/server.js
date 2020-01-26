const express = require('express');



const server = express()

server.get('/', (req,res) => {
    res.send('Welcome to the Helpers Backend')
})

server.use('/login', )


module.exports = server;

