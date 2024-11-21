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
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="navbar-right">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-toggle">Menu</Dropdown.Toggle>
            <Dropdown.Menu>
              {user ? (
                <>
                  <Dropdown.Item as="span" className="email">
                    {user.username}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <div></div>
                  <Dropdown.Item as={Link} to="/deposit">
                    Deposit Money
                  </Dropdown.Item>
                  <div></div>
                  <Dropdown.Item as={Link} to="/send-money">
                    Send Money
                  </Dropdown.Item>
                  <div></div>
                  <Dropdown.Item as={Link} to="/withdraw-money">
                    Withdraw Money
                  </Dropdown.Item>
                  <div></div>
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
      </div>
    </div>
  );
};

export default Navbar;
