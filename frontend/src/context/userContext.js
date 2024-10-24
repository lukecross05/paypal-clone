import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();
export const userReducer = (state, action) => {
  switch (
    action.type //different dispatches and what they do.
  ) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  useEffect(() => {
    //when a user uses authContext, it gets the user from local storage.
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log("AuthContext state: ", state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
