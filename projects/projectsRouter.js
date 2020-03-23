const express = require('express');
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.use((req, res, next) => {
    console.log("projectsRouter")
    next();
})

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
            })
        .catch(err => {
            res.status(500).json({ error: "This project could not be retrieved" })
        })
}); 

router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', validateProjectID, (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "The actions could not be retrieved" })
        })
})

router.post('/', (req, res) => {
    const project = req.body
    Projects.insert(project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding Project" })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(project => {
            if(project) {
                res.status(200).json({ message: "The Project has been removed" })
            } else {
                res.status(404).json({ message: "The Project could not be found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error removing the Project" })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updates = req.body
    Projects.update(id, updates)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "The Project could not be found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error saving Project updates" })
        })
})

function validateProjectID(req, res, next) {
    const {id} = req.params
    Projects.get(id)
        .then(project => {
            console.log("Project", project)
            if(project) {
                req.project = project
                next();
            } else {
                res.status(400).json({ message: "Project ID not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Project ID could not be validated" })
        })
}

module.exports = router;
