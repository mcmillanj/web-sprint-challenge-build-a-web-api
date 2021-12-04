const express = require('express');
// require('dotenv').config()
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
// function logger(req, res, next) {
//     console.log(`${req.method} request`)
//     next()
//   }


server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)
server.get('*', (req, res) => {
    res.send(`<h2 API</h2>
    <p>Welcome to the  API</p>`)
})


module.exports = server;
