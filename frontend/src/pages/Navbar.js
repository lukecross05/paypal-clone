import React from "react";
import { useLogout } from "../hooks/useLogout";
const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      Navbar<button onClick={handleClick}>Log Out</button>
    </div>
  );
};

export default Navbar;
