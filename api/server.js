const express = require('express');


const server = express()

server.get('/', (req,res) => {
    res.send('Welcome to the Seller Backend')
})


module.exports = server;

