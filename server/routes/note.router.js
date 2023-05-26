const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ------- GET user's notes -------
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET all notes');
    // ------- Query to get notes -------
    const queryText = `
        SELECT * FROM notes
        WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET notes:', error);
            res.sendStatus(500);
        })
});

// ------- POST to user's notes -------
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('In POST note');
    // ------- Query to post note to DB -------
    const queryText = `
        INSERT INTO notes 
        ("user_id", "champion_id", "note")
        VALUES ($1, $2, $3);`
    pool.query(queryText,
        [req.user.id, req.body.id, req.body.note])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR in POST note', error);
            res.sendStatus(500);
        })
});

// ------- UPDATE user's note -------
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('In UPDATE note', req.body);
    // ------- Query to update note based on id -------
    const queryText = `
        UPDATE notes
        SET "note" = $1
        WHERE "user_id" = $2 
        AND "champion_id" = $3;`;
    pool.query(queryText,
        [req.body.note, req.user.id, req.body.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in UPDATE note', error);
            res.sendStatus(500);
        })
});

// ------- DELETE from user's notes -------
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('In DELETE note');
    // ------- Query to delete note based on id -------
    const queryText = `
        DELETE FROM notes
        WHERE "user_id" = $1 
        AND "champion_id" = $2;`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in DELETE favorite', error);
            res.sendStatus(500);
        })
});

module.exports = router;