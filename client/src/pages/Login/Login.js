import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

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
    setLoginError("");
    if (!email || !password) {
      setLoginError("Lütfen tüm alanları doldurunuz");
      return;
    }
    const loginValues = { email, password };
    try {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValues),
      }).then((res) => {
        if (cancel) return;
        res.json().then((userInfos) => {
          if (cancel) return;
          if (userInfos.token) {
            localStorage.setItem("token", userInfos.token);
            dispatch({ type: "LOGIN", payload: userInfos.user });
            navigate("/");
          } else {
            setLoginError(userInfos);
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
    <form className="login-form" onSubmit={onLoginSubmit}>
      <h2>Giriş yap</h2>

      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Şifre</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn" type="submit">
        Giriş yap
      </button>
      {loginError && <p className="hata">{loginError}</p>}
    </form>
  );
}
