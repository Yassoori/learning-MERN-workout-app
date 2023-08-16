const Workout = require("../models/workoutModel"); // Workout Model

//import mongoose
const mongoose = require("mongoose");

// Get All Workouts:
const getWorkouts = async (req, res) => {
  // sort it in desecending order (latest first)
  // .sort({createdAt: -1})
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  // check if the id is a valid MongoDB id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout" });
  }

  // Try to find workout by its id - set to workout if successful
  const workout = await Workout.findById(id);

  // if the id is valid but there is no workout:
  if (!workout) {
    return res.status(404).json({ error: "No such Workout" });
  }

  // if there is a workout and it was Get
  res.status(200).json(workout);
};

// Create a New Workout
const createWorkout = async (req, res) => {
  const { title, load, reps, user_id } = req.body;

  // add doc to db
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  // check if that id is a valid MongoDB id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  // if the id is valid but there is no workout:
  if (!workout) {
    return res.status(404).json({ error: "No such Workout" });
  }

  // if there is a workout and it was deleted
  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // check if the id is valid MongoDB id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  // find a workout by its id and if finds it
  // spread out the properties of the req.body
  // it will take whats in the req.body and update the workout
  // with that information
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {
      new: true,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such Workout" });
  }

  res.status(200).json(workout);
};

//export the functions
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
