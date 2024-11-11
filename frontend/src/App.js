import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Navbar from "./pages/Navbar";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import { useUserContext } from "./hooks/useUserContext";
import Deposit from "./pages/Deposit";
function App() {
  const { user } = useUserContext();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
