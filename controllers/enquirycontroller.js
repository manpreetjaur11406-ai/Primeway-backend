const enquiryModel = require("../models/enquiryModel");


// =========================
// CREATE ENQUIRY
// =========================

const createEnquiry = (req, res) => {

  const {
    name,
    email,
    phone,
    product,
    message,
  } = req.body;


  // Check required fields

  if (!name || !email || !product) {

    return res.status(400).json({
      message: "Name, email and product are required.",
    });

  }


  enquiryModel.createEnquiry(
    name,
    email,
    phone,
    product,
    message,

    (err, result) => {

      if (err) {

        console.error(
          "Error saving enquiry:",
          err
        );

        return res.status(500).json({
          message: "Failed to save enquiry.",
        });

      }


      res.status(201).json({

        message: "Enquiry submitted successfully!",

        enquiryId: result.insertId,

      });

    }
  );
};


module.exports = {
  createEnquiry,
};