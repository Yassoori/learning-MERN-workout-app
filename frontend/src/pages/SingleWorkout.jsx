import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // set a state for the single workout
  const [workout, setWorkout] = useState(null);
  // set a loading state
  const [loading, setLoading] = useState(true);

  // axios call to get a single workout
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/workouts/${id}`)
      .then((res) => {
        // checking if it comes back an array or an object
        console.log(res.data);
        console.log(res.data[0]);
        setWorkout(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // check if loading exists and is true
  // return loading text if true
  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      {/* navigate(-1) goes back to the previous page */}
      <button onClick={() => navigate(-1)}>Back</button>
      <div>{workout.title}</div>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load}</p>
    </>
  );
};

export default SingleWorkout;
