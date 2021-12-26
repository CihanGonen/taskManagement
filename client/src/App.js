import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup/Signup";
import TalepAc from "./pages/TalepAc/TalepAc";

function App() {
  const { user, dispatch } = useAuthContext();

  const checkAuthenticated = async () => {
    const token = localStorage.token;
    if (token) {
      try {
        const res = await fetch("http://localhost:5000/verifyUser", {
          method: "POST",
          headers: { token },
        });

        const parseRes = await res.json();
        if (parseRes) {
          dispatch({ type: "LOGIN", payload: parseRes.user });
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
            <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Dashboard />}
            />
            <Route path="/talepac" element={user ? <TalepAc /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
