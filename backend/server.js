const express = require("express");
const mongoose = require("mongoose");
const app = express();
const transactionRoutes = require("./routes/transactions");
const userRoutes = require("./routes/users");

require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ mssg: "welcome to the app" });
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/transactions/", transactionRoutes);
app.use("/api/users/", userRoutes);

console.log(process.env.PORT);
mongoose
  .connect(process.env.MongoURI)
  .then(() => {
    app.listen(process.env.PORT),
      () => {
        console.log("listening on port 4000");
      };
  })
  .catch((error) => {
    console.log(error);
  });
