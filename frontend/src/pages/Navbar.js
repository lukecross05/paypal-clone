import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();
  const handleClick = () => {
    logout();
  };

  return (
    <div>
      Navbar
      <Dropdown>
        <Dropdown.Toggle>Menu</Dropdown.Toggle>
        <Dropdown.Menu>
          {user ? (
            <>
              <Dropdown.Item as="span" className="email">
                {user.username}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/">
                Home
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleClick}>
                Logout
              </Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item as={Link} to="/login">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/signup">
                Signup
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Navbar;
