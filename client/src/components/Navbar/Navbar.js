import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDbContext } from "../../hooks/useDbContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, dispatch } = useAuthContext();
  const { baskanliklar } = useDbContext();

  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="navbar">
      {user ? (
        <div className="navbar-inner">
          <div className="greetings">Hoşgeldin {user.name}</div>
          <div className="btn-wrapper">
            <Link to="/talepac">
              <button className="btn">talep oluştur</button>
            </Link>
            <button className="btn" onClick={logout}>
              çıkış
            </button>
          </div>
        </div>
      ) : (
        <div className="btn-wrapper">
          <Link to="/signup">
            <button className="btn">kayıt ol</button>
          </Link>
          <Link to="/login">
            <button className="btn">giriş yap</button>
          </Link>
        </div>
      )}
    </div>
  );
}
