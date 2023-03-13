const mongoose = require("mongoose");
const workoutsSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
const workoutmodel = mongoose.model("Workouts", workoutsSchema);
module.exports = workoutmodel;
