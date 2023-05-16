const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
	rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET champions
router.get('/', rejectUnauthenticated, (req, res) => {
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
router.get('/details', rejectUnauthenticated, (req, res) => {
    const championId = req.query.id;
    // Query to get a specific champion based on id
    const queryText = `SELECT * FROM champions WHERE id = $1;`;
    pool.query(queryText, [championId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET this champion', error);
            res.sendStatus(500);
        })
});

// GET favorites
router.get('/favorites', rejectUnauthenticated, (req, res) => {
    // Query to get all favorites
    const queryText = `SELECT * FROM favorites ORDER BY id ASC;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET favorites:', error);
            res.sendStatus(500);
        })
});

// POST favorite
router.post('/favorites', (req, res) => {
    console.log(req.body);
    // Query to post champion to favorites db based on id
    const queryText = `INSERT INTO favorites ("user_id", "champion_id")
    VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in POST favorite', error);
            res.sendStatus(500);
        })
});

module.exports = router;