const bcrypt = require("bcrypt");
const { req } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../user/userModels");
const validator = require("email-validator");

exports.hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "error occourd" });
  }
};

// TODO: write middleware function to compare plain text password with hashed password
exports.comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error("Incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "error occourd" });
  }
};

////////
// npm install jsonwebtoken

exports.tokenCheck = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decodedToken = await jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken._id);
      if (user) {
        req.user = user;
      } else {
        throw new Error("User doesn't exist");
      }
      req.authUser = user;
      console.log("headers passed");
    } else {
      console.log("No headers passed");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.validateEmail = async (req, res, next) => {
  try {
    if (validator.validate(req.body.email)) {
      console.log("vaild email");
      next();
    } else {
      throw new Error("invaild email please try again");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//EMAIL VALIDATION WITHOUT USING A NPM LIBARY

// exports.validateEmail = async (req, res, next) => {
//     try {
//         const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
//         console.log(regex.test(req.body.email)) // returns true or false
//         if (regex.test(req.body.email)) {
//             console.log("vaild email")
//             next()
//         } else {
//             throw new Error ("invaild email please try again")
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error: error.message})
//     }
// }
