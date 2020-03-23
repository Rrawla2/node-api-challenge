const express = require('express');
const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>View the projects</h2>`);
});

function logger(req, res, next) {
    console.log(`${req.method} Request`)
    next();
}

module.exports = server;