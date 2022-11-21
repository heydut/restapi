const { Router } = require("express");
const {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
} = require("./userControllers");

const userRouter = Router();
userRouter.post("/addUser", createUser);
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
