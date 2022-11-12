const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.post('/', (req, res) => {
    console.log(req.body)
    const newTask = req.body;
    const queryText = `
    INSERT INTO "list" ("task","complete")
    VALUES ($1, $2)
    `;
    pool.query(queryText, [newTask.task, newTask.complete])
    .then((result) => {
        console.log('POST result from db:', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error POSTing query:', queryText, 'error:', error);
        res.sendStatus(500);
    });
})


module.exports = router;