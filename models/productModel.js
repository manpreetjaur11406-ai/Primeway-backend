const db = require("../config/db");


// =========================
// GET ALL PRODUCTS
// =========================

const getAllProducts = (callback) => {
  const sql = "SELECT * FROM products";

  db.query(sql, callback);
};


// =========================
// SEARCH PRODUCTS
// =========================

const searchProducts = (searchTerm, callback) => {

  const sql = `
    SELECT *
    FROM products
    WHERE product_name LIKE ?
       OR category LIKE ?
  `;

  const searchValue = `%${searchTerm}%`;

  db.query(
    sql,
    [searchValue, searchValue],
    callback
  );
};


// =========================
// EXPORT
// =========================

module.exports = {
  getAllProducts,
  searchProducts,
};