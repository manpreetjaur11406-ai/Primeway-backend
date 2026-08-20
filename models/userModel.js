const db = require("../config/db");

// =========================
// CREATE USER
// =========================

const createUser = (userData, callback) => {
  const {
    name,
    email,
    phone,
    password,
    otp,
    otp_expiry
  } = userData;

  const sql = `
    INSERT INTO users
    (name, email, phone, password, otp, otp_expiry)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, password, otp, otp_expiry],
    callback
  );
};


// =========================
// FIND USER BY EMAIL
// =========================

const findUserByEmail = (email, callback) => {
  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  db.query(sql, [email], callback);
};


// =========================
// EXPORT
// =========================

module.exports = {
  createUser,
  findUserByEmail
};