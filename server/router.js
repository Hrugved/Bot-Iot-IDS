const express = require('express')
const db = require('./connection')
const router = new express.Router()

// create task
router.get('/ping', async (req,res ) => {
    res.status(200).send("pong")
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