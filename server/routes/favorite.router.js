const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ------- GET user's favorites -------
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET favorites');
    // ------- Query to get favorites -------
    const queryText = `
        SELECT favorites.id, favorites.user_id, favorites.champion_id, note
        FROM favorites
        LEFT JOIN notes 
        ON favorites.champion_id = notes.champion_id 
        AND favorites.user_id = notes.user_id
        WHERE favorites.user_id = $1
        ORDER BY favorites.id;`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET favorites:', error);
            res.sendStatus(500);
        })
});

// ------- POST to user's favorites -------
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('In POST favorite');
    // ------- Query to post champion based on id -------
    const queryText = `
        INSERT INTO favorites 
        ("user_id", "champion_id")
        VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR in POST favorite', error);
            res.sendStatus(500);
        })
});

// ------- DELETE from user's favorites -------
router.delete('/', rejectUnauthenticated, (req, res) => {
    console.log('In DELETE favorite');
    // ------- Query to delete champion based on id -------
    const queryText = `
        DELETE FROM favorites
        WHERE "user_id" = $1 
        AND "champion_id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in DELETE favorite', error);
            res.sendStatus(500);
        })
});

module.exports = router;