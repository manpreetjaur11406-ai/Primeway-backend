const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const enquiryRoutes = require("./routes/enquiry");

const app = express();

const PORT = 5000;

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
// USER AUTHENTICATION ROUTES
// =========================

app.use("/user", userRoutes);

// =========================
// ENQUIRY ROUTES
// =========================

app.use("/enquiry", enquiryRoutes);

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
