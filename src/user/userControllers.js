const { request } = require("express");
const User = require("./userModels");

exports.createUser = async (req, res) => {
  console.log(req);
  try {
    const newUser = await User.create(req.body);
    res.status(201).send({ user: newUser });
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

//userRouter.get("/listUser", listUsers);
//userRouter.patch("/updateUser", updateUser);
//userRouter.delete("/deleteUser", deleteUser);
