const { response } = require("express");
const moment = require("moment");
const express = require("express");
const Workout = require("../models/Workouts");
const router = express.Router();

router.post("/add-workout", async function (req, res) {
  try {
    const newworkout = new Workout(req.body);
    await newworkout.save();
    res.send("Workout Added");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
router.post("/edit-workout", async function (req, res) {
  try {
    await Workout.findOneAndUpdate(
      { _id: req.body.workoutId },
      req.body.payload
    );

    res.send("Workout Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/delete-workout", async function (req, res) {
  try {
    await Workout.findOneAndDelete({ _id: req.body.workoutId });

    res.send("Workout Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/get-all-workouts", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const workout = await Workout.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(req.body.frequency, "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.send(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
