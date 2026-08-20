const express = require("express");
const router = express.Router();

const productModel = require("../models/productModel");
const { optionalAuth } = require("../middleware/authMiddleware");


// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", optionalAuth, (req, res) => {

  productModel.getAllProducts((err, results) => {

    if (err) {
      console.error(
        "Error fetching products:",
        err
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }

    // =========================
    // CHECK LOGIN STATUS
    // =========================

    const isLoggedIn = !!req.user;

    let products = results;

    // =========================
    // HIDE PRICE FOR GUEST
    // =========================

    if (!isLoggedIn) {
      products = results.map((product) => {

        const { price, ...productWithoutPrice } = product;

        return productWithoutPrice;
      });
    }

    // =========================
    // SEND RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      loggedIn: isLoggedIn,
      count: products.length,
      data: products,
    });

  });

});


// =========================
// SEARCH PRODUCTS
// =========================

router.get(
  "/search",
  optionalAuth,
  (req, res) => {

    const searchTerm = req.query.q;

    // Check search input
    if (
      !searchTerm ||
      searchTerm.trim() === ""
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please enter a product name or category",
      });

    }

    productModel.searchProducts(
      searchTerm.trim(),
      (err, results) => {

        if (err) {

          console.error(
            "Error searching products:",
            err
          );

          return res.status(500).json({
            success: false,
            message: "Failed to search products",
          });

        }

        // =========================
        // CHECK LOGIN STATUS
        // =========================

        const isLoggedIn = !!req.user;

        let products = results;

        // =========================
        // HIDE PRICE FOR GUEST
        // =========================

        if (!isLoggedIn) {

          products = results.map(
            (product) => {

              const {
                price,
                ...productWithoutPrice
              } = product;

              return productWithoutPrice;
            }
          );

        }

        // =========================
        // SEND RESPONSE
        // =========================

        return res.status(200).json({

          success: true,

          loggedIn: isLoggedIn,

          count: products.length,

          data: products,

        });

      }
    );

  }
);


module.exports = router;