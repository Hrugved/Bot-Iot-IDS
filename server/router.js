const express = require('express')
const db = require('./connection')
const {predict} = require('./utils')
const router = new express.Router()

const MAX = 733705

// create task
router.get('/ping', async (req,res ) => {
    res.status(200).send("pong")
})

router.get('/send', async (req,res) => {
    const id = Math.floor(Math.random() * MAX) + 1;
    const sql = `SELECT * FROM packet where id=${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.status(400).send(null);
            throw err;
        }
        predict(data[0],req.query.client_id)
        res.status(200).send(data);
    });
})



// router.get('/semesters', async (req,res) => {
//     const sql = `SELECT semester FROM course GROUP BY semester`;
//     db.query(sql, function (err, data) {
//         if (err) {
//             res.status(400).send(null);
//             throw err;
//         }
//         data = data.map(el => el.semester)
//         res.status(200).send(data);
//     });
// })

module.exports = router