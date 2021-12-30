import { useEffect, useState } from "react";

import { useBaskanliklarContext } from "../../hooks/useBaskanliklarContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./TalepAc.css";

export default function TalepAc() {
  const [talepError, setTalepError] = useState("");
  const [talepAcildi, setTalepAcildi] = useState(false);

  const { user } = useAuthContext();
  const { baskanliklar } = useBaskanliklarContext();

  const [talepTanim, setTalepTanim] = useState("");
  const [selectedBaskanlik, setSelectedBaskanlik] = useState(0);

  useEffect(() => {
    if (baskanliklar.length > 1) {
      setSelectedBaskanlik(baskanliklar[0].baskanlik_id);
    }
  }, [baskanliklar]);

  const onTalepSubmit = async (e) => {
    e.preventDefault();
    setTalepError("");
    if (!talepTanim) {
      setTalepError("Lütfen talep bölgesini doldurunuz");
      return;
    }
    if (talepTanim.length > 800) {
      setTalepError("Lütfen 800 karakterden kısa bir talep giriniz.");
      return;
    }
    const talepValues = {
      talepkarId: user.kullanici_id,
      tanim: talepTanim,
      baskanlik_id: selectedBaskanlik,
    };

    const token = localStorage.token;

    try {
      await fetch("http://localhost:5000/talep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(talepValues),
      });
      setTalepAcildi(true);
    } catch (err) {
      console.log("buradan yazıldı");
    }
    setTalepTanim("");
    setTalepError("");
  };

  useEffect(() => {
    if (talepAcildi) {
      const timer = setTimeout(() => setTalepAcildi(false), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [talepAcildi]);

  return (
    <div className="login-wrapper">
      <div className="talep-form">
        <h2>Create a Ticket</h2>
        <form onSubmit={onTalepSubmit}>
          <label className="ust-baskanlik-label">
            Department
            <select
              value={selectedBaskanlik}
              onChange={(e) => setSelectedBaskanlik(Number(e.target.value))}
            >
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
          <label>
            Ticket Message
            <textarea
              value={talepTanim}
              onChange={(e) => setTalepTanim(e.target.value)}
              type="text"
              rows="10"
            ></textarea>
          </label>

          <button className="btn" type="submit">
            Create
          </button>
          {talepError && <p className="hata">{talepError}</p>}
          {talepAcildi && (
            <div className="bildirim">Talep başarıyla açıldı.</div>
          )}
        </form>
      </div>
      )
    </div>
  );
}
