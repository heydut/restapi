const { request } = require("express");
const User = require("./userModels");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    console.log("SUCESSFUL", newUser);
    console.log(token);
    res.status(201).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  console.log(req);
  try {
    const users = await User.find({}); //empty object to find all users in the database
    res.status(200).send({ user: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log(req);
  try {
    await User.updateOne(
      // alternative: updateMany
      { username: req.body.username },
      { [req.body.key]: req.body.value }
    );
    res.status(200).send({ message: "user has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  console.log(req);
  try {
    await User.deleteOne({ username: req.body.username });
    res.status(200).send({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (req.authUser) {
      console.log("Token exists continue to login");
      res.status(200).send({ username: req.user.username });
    } else {
      const user = await User.findOne({ username: req.body.username });
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
      console.log("Token not passed login and generate a new token");
      res.status(200).send({ username: user.username, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
