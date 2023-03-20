const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken.js");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Comman = require("../comman/comman");
const validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
router.post("/signup", validateSignUpRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);

    const userData = {
      firstName,
      lastName,
      email,
      hash_password,
    };

    const user = await User.findOne({ email });
    if (user) {
      return Comman.setResponse(res, 400, false, "User already registered");
    } else {
      User.create(userData).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else
          return Comman.setResponse(
            res,
            201,
            true,
            "User created Successfully"
          );
      });
    }
  } catch (error) {
    // res.status(400).json({ message: error.message });
    return Comman.setResponse(res, 500, false, error.message);
  }
  // res.res;
});
const validateSignIpRequest = [
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
router.post("/signin", validateSignIpRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (await bcrypt.compare(req.body.password, user.hash_password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.COOKIE_SECRET,
          { expiresIn: "30d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        Comman.setResponse(res, 200, true, "Login.", {
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        Comman.setResponse(res, 403, false, "Incorrect email or password!");
      }
    } else {
      Comman.setResponse(res, 400, false, "User does not exist..!");
    }
  } catch (error) {
    Comman.setResponse(res, 500, false, error.message);
  }
});
module.exports = router;
