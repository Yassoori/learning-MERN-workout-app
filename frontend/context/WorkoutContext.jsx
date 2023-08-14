import { createContext, useContext, useReducer } from "react";

export const WorkoutsContext = createContext();
export const workoutsReducer = (state, action) => {
  //switch statement - works like multiple if's
  switch (action.type) {
    // define cases
    // cases are the type(s)
    // ' if action.type is equal to '
    case "SET_WORKOUTS":
      return {
        workouts: action.payload, // update all the workouts to the newly fetched workouts
        // remember the payload comes from the dispatch - a bit like setState
      };
    case "CREATE_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts],
        // creates an array with the new workout at the front and puts the previous workouts from the state behind it
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
        // filters over the existing state workouts and makes sure that their _id does not
        // match our deleted workouts _id
        // We only want to keep what doesnt match
      };
    case "UPDATE_WORKOUT": {
      const updatedWorkout = action.payload;
      const updatedWorkouts = state.workouts.map((workout) => {
        if (workout._id === updatedWorkout._id) {
          return updatedWorkout;
        }
        return workout;
      });
      return {
        workouts: updatedWorkouts,
      };
    }
    default:
      return state; // return state unchanged
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  //set up useReducer
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
      {/* any component inside here will have access to the context */}
    </WorkoutsContext.Provider>
  );
};
