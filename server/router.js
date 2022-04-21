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

router.post('/register', async (req,res) => {
    const sql = `INSERT into client (client_name, client_system, ip) VALUES ('${req.body.client_name}','${req.body.client_system}','${req.body.ip}');`
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(400).send(null);
        }
        db.query(`SELECT * FROM client WHERE ip='${req.body.ip}' LIMIT 1`, function (err, data) {
            if (err) {
                res.status(400).send(null);
                throw err;
            }
            res.status(200).send(data);
        });
    })
})

router.get('/restart', async (req,res) => {
    const sql = `UPDATE client SET start_time=CURRENT_TIMESTAMP WHERE client_id=${req.query.client_id}`;
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(400).send(null);
        }
        res.status(200).send();
    });
})


module.exports = router