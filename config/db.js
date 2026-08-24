const mysql = require("mysql2");

// =========================
// MYSQL CONNECTION POOL
// =========================

const db = mysql.createPool({
  host: process.env.DB_HOST?.trim(),
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME?.trim(),

  ssl: {
    rejectUnauthorized: false,
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
    console.error("MySQL connection failed:", err);
    return;
  }

  console.log("=================================");
  console.log("MySQL connected successfully!");
  console.log("=================================");

  connection.release();
});

// =========================
// EXPORT DATABASE
// =========================

module.exports = db;