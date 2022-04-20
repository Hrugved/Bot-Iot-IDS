const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : "localhost:3306",
  user     : "root",
  password : "C6bwtf4ocp#",
  database : "bot_iot"
});
module.exports = connection