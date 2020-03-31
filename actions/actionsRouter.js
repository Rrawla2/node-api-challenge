const express = require('express');
const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "The action could not be retrieved" })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "The action could not be retrieved" })
        })
});

router.post('/', (req, res) => {
    const newAction = req.body
    console.log(newAction)
    Actions.insert(newAction)
        .then(action => {
            if(newAction) {
                res.status(201).json(action)
            } else if (!newAction.description || !newAction.notes) {
                res.status(400).json({ message: "The description and notes are required" })
            } else {
                res.status(400).json({ message: "The Project with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error saving this action" })
        })
})         

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "Could not remove the action with this ID" })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updates = req.body
    Actions.update(id, updates)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: "Could not update this action" })
        })
})

module.exports = router;