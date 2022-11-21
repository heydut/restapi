const { Router } = require("express");
const {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("./userControllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");
// TODO: import middleware function bellow
const userRouter = Router();

userRouter.post("/addUser", hashPass, createUser);
// TODO: call middleware function below
userRouter.post("/loginUser", tokenCheck, comparePass, loginUser);
userRouter.get("/listUsers", listUsers);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter;

// Thunder client = imsomnia insie

// POST
// http://localhost:5001/addUser
// {
// 	"username": "Name2",
// 	"email": "email2@email.com",
// 	"password": "test123"
// }

// GET
// http://localhost:5001/listUsers

// PUT
// http://localhost:5001/updateUser
// {
// 	"username": "Name2",
// 	"key": "username",
// 	"value": "NAME2"
// }

// DELETE
// http://localhost:5001/deleteUser
// {
// 	"username": "Name3"
// }

// npm install bcrypt

// POST
// http://localhost:5001/loginUser

// {
// 	"username": "Name4",
// 	"password": "test123"
// }

// {
// "username": "Name7",
// "password": "pass123",
// 	"email": "email7@email.com"
// }
