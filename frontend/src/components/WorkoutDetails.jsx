import { useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
//import of date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";

const WorkoutDetails = ({ workout }) => {
  // bring in dispatch method
  const { dispatch } = useWorkoutContext();
  const navigate = useNavigate();

  const handleNavigate = () => {
    let path = `/${workout._id}`;
    navigate(path);
  };

  const [isEditing, setIsEditing] = useState(false);
  // state for our edit form
  const [editTitle, setEditTitle] = useState(workout.title);
  const [editLoad, setEditLoad] = useState(workout.load);
  const [editReps, setEditReps] = useState(workout.reps);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(workout.title);
    setEditLoad(workout.load);
    setEditReps(workout.reps);
    setIsEditing(false);
  };

  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps,
    };

    // axios
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        updatedWorkout
      );
      const updatedData = response.data;

      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({ type: "UPDATE_WORKOUT", payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:4000/api/workouts/${workout._id}`
    );
    const json = await response.data;

    if (response.status === 200) {
      console.log(json);
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  // im guessing
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.email;

  return (
    <div className="workout-details">
      {isEditing ? (
        <div className="edit-moadal">
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            placeholder={workout.title}
          />
          <input
            type="text"
            value={editLoad}
            onChange={(e) => setEditLoad(e.target.value)}
            placeholder={workout.load}
          />
          <input
            type="text"
            value={editReps}
            onChange={(event) => setEditReps(event.target.value)}
            placeholder={workout.reps}
          />

          <button onClick={handleSubmitEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <h4>{workout.title}</h4>
          {workout.image && (
            <img
              className="workout-image"
              src={`http://localhost:4000/public/uploads/${workout.imgae}`}
              alt={workout.title}
            />
          )}
          <p>
            <strong>Load (kg): </strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps}
          </p>
          <p>
            {formatDistanceToNow(
              new Date(workout.createdAt),
              { includeSeconds: true },
              { addSuffix: true }
            )}{" "}
            ago
          </p>
          <p>
            <strong>Created by:</strong>
            {workout.user_id}
          </p>
          {user_id === workout.user_id && (
            <div>
              <span onClick={handleDelete} className="delete">
                <i className="fa-solid fa-trash"></i>
              </span>
              <span onClick={handleEdit} className="edit">
                <i className="fa-solid fa-pen"></i>
              </span>
            </div>
          )}
          <button onClick={handleNavigate}>Read More</button>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
