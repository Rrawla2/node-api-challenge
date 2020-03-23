const express = require('express');
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: "The actions could not be retrieved" })
        })
});

// router.get('/:id/actions', validateActionId, (req, res) => {
//     const { id } = req.params
//     Actions.get(id)
//         .then(action => {
//             console.log("Action", action)
//             if(action) {
//                 res.status(200).json(action)
//             } else {
//                 res.status(400).json({ message: "Project Action not found" })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: "Project Action could not be validated"})
//         })
// }); 

function validateActionId(req, res, next) {
    // do your magic!
    const { id } = req.params
    Actions.get(id)
      .then(action => {
        console.log("Action", action)
        if (action) {
          next();
        } else {
          res.status(400).json({ message: "Project Action not found" })
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Project Action could not be validated" })
      })
  }

  module.exports = router;