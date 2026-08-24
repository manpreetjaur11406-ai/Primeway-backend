const mysql = require("mysql2");

// =========================
// MYSQL CONNECTION POOL
// =========================

const db = mysql.createPool({
  host: process.env.DB_HOST?.trim(),
  port: Number(process.env.DB_PORT?.trim()),
  user: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
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
    console.error("❌ MySQL connection failed:", err);
    return;
  }

  console.log("✅ MySQL connected successfully!");

  connection.release();
});

// =========================
// EXPORT DATABASE
// =========================

module.exports = db;