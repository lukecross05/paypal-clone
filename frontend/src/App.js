import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Navbar from "./pages/Navbar";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import { useUserContext } from "./hooks/useUserContext";
import Deposit from "./pages/Deposit";
import SendMoney from "./pages/SendMoney";
import Withdraw from "./pages/Withdraw";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { user } = useUserContext();
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/withdraw-money" element={<Withdraw />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
