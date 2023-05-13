const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET champions
router.get('/', (req, res) => {
    // Query to get all champions
    const queryText = `SELECT * FROM champions ORDER BY name ASC;`;
    pool.query(queryText)
        .then(result => { 
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET all champions:', error);
            res.sendStatus(500);
        })
});

// GET this champion
router.get('/details', (req, res) => {
    const championId = req.query.id;
    // Query to get a specific champion based on id
    const queryText = `SELECT * FROM champions WHERE id = $1;`;
    pool.query(queryText, [championId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET this champion', error);
        })
});

module.exports = router;