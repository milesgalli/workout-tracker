const router = require("express").Router();

const db = require("../models");

// Get to find the last workout

router.get("./workouts", (req, res) => {
  db.workout.find({}, (err, lastWorkoutData) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    res.json(lastWorkoutData);
  });
});

//Put / update - add excersise to last workout

router.put("/workouts/:id", (req, res) => {
  db.workout
    .update({ _id: req.params.id }, { $push: { excersises: req.body } })
    .then((updateData) => {
      res.json(updateData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Post to create a new workout

router.post("/workouts/range", (req, res) => {
  db.workout
    .create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// get to find workouts within the db
router.get("/workouts/range", (req, res) => {
  db.workout
    .find()
    .sort({ day: -1 })
    .limit(7)
    .then((workoutData) => {
      return res.json(workoutData);
    })
    .then((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    });
});

module.exports = router