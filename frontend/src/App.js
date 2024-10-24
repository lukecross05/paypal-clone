import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
