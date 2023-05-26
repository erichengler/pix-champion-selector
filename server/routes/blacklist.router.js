const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ------- GET user's blacklist -------
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET blacklist');
    // ------- Query to get blacklist -------
    const queryText = `
        SELECT * from blacklist
        WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET blacklist:', error);
            res.sendStatus(500);
        })
})

// ------- POST to user's blacklist -------
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('In POST to blacklist');
    // ------- Query to post champion based on id -------
    const queryText = `
        INSERT INTO blacklist 
        ("user_id", "champion_id")
        VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR in POST to blacklist', error);
            res.sendStatus(500);
        })
});

// ------- DELETE from user's blacklist -------
router.delete('/', rejectUnauthenticated, (req, res) => {
    console.log('In DELETE from blacklist');
    // ------- Query to delete champion based on id -------
    const queryText = `
        DELETE FROM blacklist
        WHERE "user_id" = $1 
        AND "champion_id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in DELETE from blacklist', error);
            res.sendStatus(500);
        })
});

module.exports = router;