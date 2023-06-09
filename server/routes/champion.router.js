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

module.exports = router;