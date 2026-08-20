const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

console.log("******** NEW USER CONTROLLER LOADED ********");


// =========================
// SIGNUP
// =========================

const signup = async (req, res) => {
  console.log("******** SIGNUP CONTROLLER REACHED ********");

  try {
    const { name, email, phone, password } = req.body;

    // Check all fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    userModel.findUserByEmail(email, async (error, results) => {
      if (error) {
        console.error("Database error:", error);

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("******** PASSWORD HASHED ********");

        // Generate 6 digit OTP
        const otp = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // OTP expires after 10 minutes
        const otp_expiry = new Date(
          Date.now() + 10 * 60 * 1000
        );

        // Create user
        userModel.createUser(
          {
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otp_expiry,
          },
          (error, result) => {
            if (error) {
              console.error("Database error:", error);

              return res.status(500).json({
                message: "Failed to create user",
              });
            }

            console.log("******** USER CREATED ********");
            console.log("User ID:", result.insertId);
            console.log("OTP:", otp);

            return res.status(201).json({
              message: "Signup successful. OTP generated.",
              userId: result.insertId,
              otp: otp,
            });
          }
        );
      } catch (error) {
        console.error("Password hashing error:", error);

        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    });

  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {
  console.log("******** LOGIN CONTROLLER REACHED ********");

  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    userModel.findUserByEmail(
      email,
      async (error, results) => {
        if (error) {
          console.error("Database error:", error);

          return res.status(500).json({
            message: "Database error",
          });
        }

        // User not found
        if (results.length === 0) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        const user = results[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        console.log("******** LOGIN SUCCESSFUL ********");

        // JWT Secret
        const secretKey =
          process.env.JWT_SECRET || "primeway_secret_key";

        // Create JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          secretKey,
          {
            expiresIn: "1d",
          }
        );

        // Send response
        return res.status(200).json({
          message: "Login successful",

          token: token,

          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
      }
    );

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
  signup,
  login,
};