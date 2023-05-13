const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET champions
router.get('/', (req, res) => {
    // Query to get all champions
    const queryText = `SELECT * FROM "champions" ORDER BY "name" ASC;`;
    pool.query(queryText)
        .then(result => { 
            console.log(result.rows)
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET all champions:', error);
            res.sendStatus(500);
        })
})

module.exports = router;