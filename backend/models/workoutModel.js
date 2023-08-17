const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    //define my rules for the data
    // key : dataType, required:true  - only add required if you want to enforce the value
    title: {
      // dataType = String
      type: String,
      // set it to required
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    // this works too
    // user_id: {
    //   type: String,
    //   ref: "User"
    // }
    image: {
      type: String,
      default: null,
      // setting the defalt to a placeholder would be good too
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
