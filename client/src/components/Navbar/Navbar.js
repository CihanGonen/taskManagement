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
          <div className="greetings">Welcome {user.name}</div>
          <div>
            <Link to="/">
              <h5>go to DASHBOARD</h5>
            </Link>
          </div>
          <div className="btn-wrapper">
            <Link to="/talepac">
              <button className="btn">Create Ticket</button>
            </Link>
            <button className="btn" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="btn-wrapper">
          <Link to="/login">
            <button className="btn">Log in</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
