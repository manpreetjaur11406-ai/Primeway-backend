const mysql = require("mysql2");


// =========================
// MYSQL CONNECTION
// =========================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "L@kshm@nn303",
  database: "techpro",
});


// =========================
// CONNECT TO MYSQL
// =========================

db.connect((err) => {
  if (err) {
    console.error(
      "MySQL connection failed:",
      err.message
    );

    return;
  }

  console.log("MySQL connected successfully!");
});


module.exports = db;