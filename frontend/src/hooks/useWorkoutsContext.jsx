import { WorkoutsContext } from "../../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);
  // provides both state and dispatch

  // error check - check that context is available
  // ie are you uins it inside of the Context.Provider component
  if (!context) {
    throw Error("useWorkoutsContext hook must be used inside WorkoutsProvider");
  }
  // There is only context when this is invoked inside WorkoutsContextProvider

  return context;
};
