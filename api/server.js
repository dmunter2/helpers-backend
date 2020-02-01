const express = require('express');
const authlogin = require('../auth/auth-router')
const post = require('../posts/post-router')
const cors = require('cors')
const server = express()

server.use(cors())

server.use(express.json())


server.get('/', (req,res) => {
    res.send('Welcome to the Helpers Backend')
})


server.use('/api', authlogin)
server.use('/api/post', post)



module.exports = server;

