const express = require("express");
const logger = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const ConsulConfiguration = require("../BlogService/ConsulConfig");
ConsulConfiguration(app);
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use("/api/auth", routes);


mongoose.connect("mongodb://localhost:27017/BlogifyAuthDB");
mongoose.connection
  .once("open", () => {
    console.log("Connected to DB");
  })
  .on("error", (err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
