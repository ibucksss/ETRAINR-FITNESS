const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ibucksss:dbPass@pocketpal.hw7tlos.mongodb.net/workout-tracker",

  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));
connection.on("connected", () => console.log("Mongo DB Connection Successful"));
