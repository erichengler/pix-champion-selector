const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ------- GET all champions -------
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET all champions');
    // ------- Query to get all champions -------
    const queryText =`
        SELECT * FROM champions 
        ORDER BY name ASC;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET all champions:', error);
            res.sendStatus(500);
        })
});

// ------- GET this champion -------
router.get('/details', rejectUnauthenticated, (req, res) => {
    console.log('In GET this champion');
    // ------- Query to get champion based on id -------
    const queryText =`
        SELECT * FROM champions 
        WHERE id = $1;`;
    pool.query(queryText, [req.query.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET this champion', error);
            res.sendStatus(500);
        })
});

// ------- GET favorites -------
router.get('/favorites', rejectUnauthenticated, (req, res) => {
    console.log('In GET favorites');
    // ------- Query to get all favorites -------
    const queryText =`
        SELECT * FROM favorites 
        WHERE user_id = $1 
        ORDER BY id ASC;`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET favorites:', error);
            res.sendStatus(500);
        })
});

// ------- POST to favorites -------
router.post('/favorites', rejectUnauthenticated, (req, res) => {
    console.log('In POST favorite');
    // ------- Query to post champion based on id -------
    const queryText =`
        INSERT INTO favorites 
        ("user_id", "champion_id")
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

// ------- DELETE from favorites -------
router.delete('/favorites', rejectUnauthenticated, (req, res) => {
    console.log('In DELETE favorite');
    // ------- Query to delete champion based on id -------
    const queryText =`
        DELETE FROM favorites
        WHERE "user_id" = $1 AND "id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in DELETE favorite', error);
            res.sendStatus(500);
        })
});

// ------- GET this note -------
router.get('/thisnote', rejectUnauthenticated, (req, res) => {
    console.log('In GET this note');
    // ------- Query to get note based on id -------
    const queryText =`
        SELECT * FROM notes 
        WHERE "user_id" = $1 AND "champion_id" = $2;`;
    pool.query(queryText, [req.user.id, req.query.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR in GET this note', error);
            res.sendStatus(500);
        })
});

// ------- POST to notes -------
router.post('/notes', rejectUnauthenticated, (req, res) => {
    console.log('In POST note');
    // ------- Query to post note to DB -------
    const queryText =`
        INSERT INTO notes 
        ("user_id", "champion_id", "note")
        VALUES ($1, $2, $3);`
    pool.query(queryText,
        [req.user.id, req.body.id, req.body.note])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in POST note', error);
            res.sendStatus(500);
        })
});

// ------- DELETE from notes -------
router.delete('/notes/:id', rejectUnauthenticated, (req, res) => {
    console.log('In DELETE note');
    // ------- Query to delete note based on id -------
    const queryText =`
        DELETE FROM notes
        WHERE "user_id" = $1 AND "champion_id" = $2;`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in DELETE favorite', error);
            res.sendStatus(500);
        })
});

// ------- UPDATE note -------
router.put('/notes', rejectUnauthenticated, (req, res) => {
    console.log('In UPDATE note', req.body);
    // ------- Query to update note based on id -------
    const queryText = `
        UPDATE notes
        SET "note" = $1
        WHERE "user_id" = $2 AND "champion_id" = $3;`;
    pool.query(queryText, 
        [req.body.note, req.user.id, req.body.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('ERROR in UPDATE note', error);
            res.sendStatus(500);
        })
})

module.exports = router;