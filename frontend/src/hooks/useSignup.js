import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const { dispatch } = useUserContext();

  const signup = async (email, username, password) => {
    //request to create a new user.
    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json)); //puts user into local storage and context.
      dispatch({ type: "LOGIN", payload: json });
      console.log("signed up");
      console.log(json);
    }
  };
  return { signup };
};
