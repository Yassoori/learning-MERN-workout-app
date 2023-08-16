import { useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  // Bring in dispatch
  const { dispatch } = useWorkoutContext();
  // States
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const [error, setError] = useState(null);

  // Handle Submit - Post request to our workout end point
  // prevent the default form button behaviour
  // data - create an object called workout and pass our state values into it
  // axios - send the data object up as the request payload
  // header - tells the server we are using JSON data
  // set error state - so we can show error to user later on
  // reset the values of the form if the request is successful

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.email;

    // data object to send as payload
    const workout = { title, load, reps, user_id };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/workouts",
        workout,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      console.log("new workout added", response.data);
      dispatch({ type: "CREATE_WORKOUTS", payload: response.data });
    } catch (error) {
      console.error(error), setError(error.message);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Exercise"
      />
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        placeholder="Load"
      />
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        placeholder="Reps"
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
