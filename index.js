const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const enquiryRoutes = require("./routes/enquiry");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully!",
  });
});


// =========================
// PRODUCT ROUTES
// =========================

app.use("/products", productRoutes);


// =========================
// USER ROUTES
// =========================

app.use("/user", userRoutes);


// =========================
// ENQUIRY ROUTES
// =========================

app.use("/enquiry", enquiryRoutes);


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});