require("./db/connection");

const userRouter = require("./user/userRoutes");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(userRouter);

// backend connection
app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
}); // backend connection

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
