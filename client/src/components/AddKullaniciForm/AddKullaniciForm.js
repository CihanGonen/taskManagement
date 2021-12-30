import { useEffect, useState } from "react";

import { useBaskanliklarContext } from "../../hooks/useBaskanliklarContext";

import "./AddKullaniciForm.css";

export default function AddKullaniciForm() {
  const [yetkiler, setYetkiler] = useState([]);

  const [isim, setIsim] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [userYetki, setUserYetki] = useState(1);
  const [userBaskanlik, setUserBaskanlik] = useState("");

  const { baskanliklar } = useBaskanliklarContext();

  const fetchYetkiler = async () => {
    try {
      let res = await fetch("http://localhost:5000/yetki", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resYetki = await res.json();
      setYetkiler(resYetki);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchYetkiler();
  }, []);

  const onKullaniciFormSubmit = async (e) => {
    e.preventDefault();
    const kullaniciValues = {
      name: isim,
      email: mail,
      password,
      yetki_id: Number(userYetki),
      baskanlik_id: userBaskanlik === "" ? null : Number(userBaskanlik),
    };
    console.log(kullaniciValues);
    try {
      let res = await fetch("http://localhost:5000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kullaniciValues),
      });
      let gelen = await res.json();
      console.log(gelen);
    } catch (err) {
      console.log(err.message);
    }
    e.preventDefault();
    setIsim("");
    setMail("");
    setPassword("");
    setUserYetki("");
    setUserBaskanlik("");
  };

  return (
    <div className="kullanici-form">
      <h2>Kullanıcı Ekle</h2>
      <form onSubmit={onKullaniciFormSubmit}>
        <label>
          İsim
          <input
            value={isim}
            onChange={(e) => setIsim(e.target.value)}
            type="text"
          />
        </label>
        <label>
          Email
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            type="email"
          />
        </label>
        <label>
          Şifre
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <label>
          Yetki
          <select
            value={userYetki}
            onChange={(e) => setUserYetki(e.target.value)}
          >
            {yetkiler.map((yetki) => (
              <option key={yetki.yetki_id} value={yetki.yetki_id}>
                {yetki.adi}
              </option>
            ))}
          </select>
        </label>

        <label className="ust-baskanlik-label">
          Başkanlık
          <select
            value={userBaskanlik}
            onChange={(e) => setUserBaskanlik(e.target.value)}
          >
            <option />
            {baskanliklar &&
              baskanliklar.map((baskanlik) => (
                <option
                  key={baskanlik.baskanlik_id}
                  value={baskanlik.baskanlik_id}
                >
                  {baskanlik.adi}
                </option>
              ))}
          </select>
        </label>
        <button className="btn baskanlik-btn" type="submit">
          Ekle
        </button>
      </form>
    </div>
  );
}
