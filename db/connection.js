const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aaVe1775!",
  database: "employees"
});

// connection.connect(function (err) {
//   if (err) throw err;
// });

const pool = connection.promise()

module.exports = {connection, pool};
