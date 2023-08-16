import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true); // disables button to stop requests
    setError(null); // ensure there are no errors

    // api call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // end of url

      if (response.status !== 200) {
        setIsLoading(false);
        setError(error.response.data.error);
      }

      // Handle if the respone ia ok
      // status = 200
      if (response.status === 200) {
        // save user local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // update the auth context - say user is signed in
        // dispatch with the relevant type - 'LOGIN'
        dispatch({ type: "LOGIN", payload: response.data });

        // reenable the button
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.response.data.error);
      // update the error state
      setError(error.response.data.error);
      setIsLoading(false);
    }
  }; // end of log in

  return { login, isLoading, error }; // sign up function, isLoading state, error state
};
