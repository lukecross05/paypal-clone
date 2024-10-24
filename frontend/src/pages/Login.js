import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); //calls login function from useLogin hook.
    await login(username, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="login-title">Log In</h3>
      <div className="spacing-login"></div>
      <input
        type="username"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="spacing-login"></div>
      <div>
        <button className="loginButton">Log In</button>
      </div>
    </form>
  );
};

export default LogIn;
