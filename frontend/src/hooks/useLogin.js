import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState("");
  const { dispatch } = useUserContext();
  const login = async (username, password) => {
    setIsLoading(true);
    //sends a login request.
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
    }
    if (response.ok) {
      console.log("logged in", json);
      localStorage.setItem("user", JSON.stringify(json)); //puts user into local storage and context.
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login };
};
