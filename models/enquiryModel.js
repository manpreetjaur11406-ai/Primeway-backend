const db = require("../config/db");


// Create a new enquiry
const createEnquiry = (
  name,
  email,
  phone,
  product,
  message,
  callback
) => {

  const sql = `
    INSERT INTO enquiries
    (name, email, phone, product, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, product, message],
    callback
  );
};


module.exports = {
  createEnquiry,
};