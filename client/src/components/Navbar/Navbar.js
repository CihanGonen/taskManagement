import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBaskanliklarContext } from "../../hooks/useBaskanliklarContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, dispatch } = useAuthContext();

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
          <div>
            <Link to="/">
              <h5>ANA SAYFA'ya git</h5>
            </Link>
          </div>
          <div className="btn-wrapper">
            <Link to="/talepac">
              <button className="btn">Talep Oluştur</button>
            </Link>
            <button className="btn" onClick={logout}>
              Çıkış yap
            </button>
          </div>
        </div>
      ) : (
        <div className="btn-wrapper">
          <Link to="/login">
            <button className="btn">Giriş yap</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Kayıt ol</button>
          </Link>
        </div>
      )}
    </div>
  );
}
