const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');
const ConsulConfiguration = require("./ConsulConfig");
const app = express();
ConsulConfiguration(app);
mongoose.connect("mongodb://localhost:27017/BlogsDB");
mongoose.connection
  .once("open", () => {
    console.log("Connected to database");
  })
  .on("error", (err) => {
    console.log(err);
  });
app.use(express.json());
app.use('/api', routes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
