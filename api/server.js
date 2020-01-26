const express = require('express');
const authlogin = require('../auth/auth-router')


const server = express()

server.use(express.json())
server.get('/', (req,res) => {
    res.send('Welcome to the Helpers Backend')
})

server.use('/api', authlogin)


module.exports = server;

