// import { useState, useEffect } from "react";
// because we created useWorkoutContext, we arent using useState anymore

import { useEffect, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// Import Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();
  const [myWorkouts, setMyWorkouts] = useState(null);

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

  const handleMyWorkouts = () => {
    setMyWorkouts(true);
  };

  const handleAllWorkouts = () => {
    setMyWorkouts(null);
  };

  return (
    <div className="home">
      <div className="workouts">
        <button onClick={handleMyWorkouts}>My Workouts</button>
        <button onClick={handleAllWorkouts}>All Workouts</button>
        {myWorkouts
          ? workouts &&
            workouts.map((workout) => {
              const user = JSON.parse(localStorage.getItem("user"));
              const user_id = user.email;
              if (workout.user_id === user_id) {
                return <WorkoutDetails key={workout._id} workout={workout} />;
              }
            })
          : workouts &&
            workouts.map((workout) => {
              const user = JSON.parse(localStorage.getItem("user"));
              const user_id = user.email;
              return <WorkoutDetails key={workout._id} workout={workout} />;
            })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
