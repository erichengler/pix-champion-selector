const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ------- Post champion info from jsons to database -------
router.post('/', rejectUnauthenticated, (req, res) => {
    const info = req.body.info
    const images = req.body.images
    // ------- Query to insert values into champions DB -------
    const queryText = `
        INSERT INTO champions ("name", "title", "difficulty", "lore",
            "imageSplash", "imageTile", "imageSmall")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`
    pool.query(queryText, [
        info.name, 
        info.title, 
        info.info.difficulty, 
        info.lore, 
        images.splash, 
        images.tile, 
        images.small
    ])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('ERROR in GET champions:', error);
            res.sendStatus(500);
        })
});

// ------- GET all champions -------
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET all champions');
    // ------- Query to get all champions -------
    const queryText = `
        SELECT * FROM champions 
        ORDER BY id ASC;`;
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
    const queryText = `
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

// ------- GET user's notes -------
router.get('/notes', rejectUnauthenticated, (req, res) => {
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
router.post('/notes', rejectUnauthenticated, (req, res) => {
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
router.put('/notes', rejectUnauthenticated, (req, res) => {
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
router.delete('/notes/:id', rejectUnauthenticated, (req, res) => {
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

// ------- GET user's blacklist -------
router.get('/blacklist', rejectUnauthenticated, (req, res) => {
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
router.post('/blacklist', rejectUnauthenticated, (req, res) => {
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
router.delete('/blacklist', rejectUnauthenticated, (req, res) => {
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