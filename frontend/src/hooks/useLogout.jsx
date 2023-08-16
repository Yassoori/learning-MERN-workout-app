import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext(); // bring in dispatch to change auth context
  // method 1 - clear local storage
  // localStorage.clear()

  const logout = () => {
    // method 2 - remove the specific item
    localStorage.removeItem("user");

    // update the auth context - clear out
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
