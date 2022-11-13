const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

//db connection
const pool = require('../modules/pool')

//post tasks
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
});

//get tasks
router.get('/', (req,res) => {
    let queryText = 'SELECT * FROM "list" ORDER BY "id" desc;';
    pool.query(queryText)
        .then((result) => {
            console.log('result.rows:', result.rows)
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Query error: ${queryText}, error: ${error}`);
            res.sendStatus(500);
        });
});

//delete task
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('delete router id:', id);
    const queryText = `DELETE FROM "list" WHERE "id" = $1;`;
    pool.query(queryText, [id])
        .then(() => {
            console.log('Task delete success!')
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in delete query: ${queryText}, error ${error}`);
            res.sendStatus(500);
        })
});

//update status
router.put('/:id', (req, res) => {
    console.log('in put router', req);
    const taskId = req.params.id;
    const queryText = `UPDATE "list" SET "complete" = NOT complete WHERE ID=$1`
    pool.query(queryText, [taskId])
        .then(() => {
            console.log('It worked!');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in put router', queryText, error);
            res.sendStatus(500);
        });
});

module.exports = router;