import { useState } from "react";

export const useLogin = () => {
  const login = async (username, password) => {
    //sends a login request.
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    console.log(json);
    if (response.ok) {
      console.log("logged in", json);
    }
  };
  return { login };
};
