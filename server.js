//import libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todos = require("./database");

//Import Env parameters
const port = process.env.PORT;
const DATABASE_URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/todos?authSource=admin`;

//Connect to MongoDB
mongoose
  .connect(`${DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected successfully"));

//Express Middlewares
app.use(express.json());
app.use(express.static("public"));

//post handler
app.post("/todo", (req, res) => {
  const dataItem = new Todos({
    data: req.body.item,
  });
  dataItem
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//Get Handler
app.get("/todos", (req, res) => {
  Todos.find().then((data) => res.json(data));
});

//Delete Handler
app.delete("/todo", (req, res) => {
  Todos.findByIdAndDelete(req.body._id).then((data) => res.json(data));
});

//App connection initiation
app.listen(port, () => {
  console.log(`Server Started....`);
});
