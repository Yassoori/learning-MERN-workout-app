// import { useState, useEffect } from "react";
// because we created useWorkoutContext, we arent using useState anymore

import { useEffect } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// Import Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // axios call
      const response = await axios.get("http://localhost:4000/api/workouts");

      // check response state is ok (200)
      if (response.status === 200) {
        // setWorkouts(response.data);
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return (
              <>
                <WorkoutDetails key={workout._id} workout={workout} />
              </>
            );
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
