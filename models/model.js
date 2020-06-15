
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [],
},
{
  toJSON: {
    //include any virtual properties when data is requested
    virtuals: true
  }
});

WorkoutSchema.virtual('totalDuration').get(function() {
  return this.exercises.reduce((currTotal, { duration }) => currTotal + duration, 0);
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;