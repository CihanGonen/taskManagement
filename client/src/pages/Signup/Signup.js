import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Signup.css";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const [cancel, setCancel] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  useEffect(() => {
    // unmount operations
    return () => {
      setCancel(true);
    };
  }, []);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    if (!name || !email || !password) {
      setSignupError("Lütfen tüm alanları doldurunuz");
      return;
    }
    const signupValues = { name, email, password };
    try {
      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupValues),
      }).then((res) => {
        if (cancel) return;
        res.json().then((userInfos) => {
          if (cancel) return;
          if (userInfos.token) {
            localStorage.setItem("token", userInfos.token);
            dispatch({ type: "LOGIN", payload: userInfos.user });
            navigate("/");
          } else {
            console.log(userInfos);
            setSignupError(userInfos);
          }
        });
      });
    } catch (err) {
      console.log("buradan yazıldı");
    }
    setPassword("");
    setEmail("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h2>Sign up</h2>
        <form onSubmit={onLoginSubmit}>
          <label>
            Username
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </label>

          <button className="btn" type="submit">
            Sign up
          </button>
          {signupError && <p className="hata">{signupError}</p>}
        </form>
      </div>
    </div>
  );
}
