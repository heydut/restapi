const User = require("./userModels");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    console.log("SUCCESFUL", newUser);
    console.log(token);
    res.status(201).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).send({ user: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.updateOne(
      { username: req.body.username },
      { [req.body.key]: req.body.value }
    );
    res.status(200).send({ message: "user felid has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ username: req.body.username });
    res.status(200).send({ message: "successfully deleted a user" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (req.authUser) {
      console.log("token exists continue to login");
      res.status(200).send({ username: req.user.username });
    } else {
      const user = await User.findOne({ username: req.body.username });
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
      console.log("token not passed continue login and generate a new token");
      res.status(200).send({ username: user.username, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
