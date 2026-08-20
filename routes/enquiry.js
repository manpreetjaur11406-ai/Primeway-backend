const express = require("express");

const router = express.Router();

const {
  createEnquiry,
} = require("../controllers/enquiryController");


// POST /enquiry

router.post("/", createEnquiry);


module.exports = router;