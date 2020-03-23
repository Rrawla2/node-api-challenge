const express = require('express');
const projectsRouter = require("./projects/projectsRouter");


const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>View the projects</h2>`);
});

function logger(req, res, next) {
    console.log(`${req.method} Request`)
    next();
}

module.exports = server;