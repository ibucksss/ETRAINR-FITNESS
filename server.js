const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
app.use(express.json());
app.use(express.static("static"));
const port = process.env.PORT || 8000;
const path = require("path");
const userRoute = require("./routes/userRoute");
const workoutRoute = require("./routes/workoutRoute");
app.use("/api/users/", userRoute);
app.use("/api/workouts/", workoutRoute);
if ((process.env.PORT = "production")) {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
app.use("/api/users/", userRoute);
app.use("/api/workouts/", workoutRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
