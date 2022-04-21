const express = require('express')
const db = require('./connection')
const {predict,parse_log_data,get_category,get_subcategory} = require('./utils')
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
            res.status(200).send({data:data[0],category:get_category(),subcategory:get_subcategory()});
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

// const req.body.filter = {
//     client_id: 2, -> omit for all clients
//     interval: [0, Date.now()] -> timestamp in ms
// }
router.post('/logs', async (req,res) => {
    const {client_id,interval} = req.body
    // console.log('client_id '+client_id);
    // console.log('interval '+interval);
    let sql = `SELECT CONCAT (category, '_', subcategory) AS cat_sub,COUNT(*) as count FROM log`
    sql += ` WHERE log_time BETWEEN FROM_UNIXTIME(${interval[0]}*0.001) AND FROM_UNIXTIME(${interval[1]}*0.001)` // unixtimestamps are in secs
    if(client_id) {
        sql+=` AND client_id=${client_id}` 
    }
    sql += ` GROUP BY cat_sub;`
    console.log(sql);
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(400).send(null);
        }
        data = parse_log_data(data);
        res.status(200).send(data);
    });
})


module.exports = router