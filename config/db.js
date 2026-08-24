const mysql = require("mysql2");

// =========================
// MYSQL CONNECTION POOL
// =========================

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// =========================
// TEST MYSQL CONNECTION
// =========================

db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully!");

  connection.release();
});

// =========================
// EXPORT DATABASE
// =========================

module.exports = db;