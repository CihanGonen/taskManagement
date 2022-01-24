import { useEffect, useState } from "react";
import Yorum from "../Yorum/Yorum";
import "./Yorumlar.css";

export default function Yorumlar({ user, talep_id }) {
  const [yorum, setYorum] = useState("");
  const [yorumError, setYorumError] = useState("");
  const [yorumlar, setYorumlar] = useState([]);
  const [yorumlarPending, setYorumlarPending] = useState(false);

  //yorum eklendi bildirimi eklenebilir
  const onYorumSubmit = async (e) => {
    e.preventDefault();
    setYorumError("");

    if (!yorum) {
      setYorumError("Lütfen bir yorum giriniz.");
      return;
    }

    const yorumBody = {
      icerik: yorum,
      talep_id,
      kullanici_id: user.kullanici_id,
    };

    try {
      await fetch("http://localhost:5000/yorum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(yorumBody),
      });
      setYorumError("");
      setYorum("");
      fetchYorumlar();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchYorumlar = async () => {
    setYorumlarPending(true);
    try {
      const res = await fetch(`http://localhost:5000/yorum/${talep_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resYorumlar = await res.json();
      setYorumlar(resYorumlar);
      setYorumlarPending(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchYorumlar();
  }, []);

  return (
    <div>
      <form onSubmit={onYorumSubmit} className="yeni-yorum">
        <label>
          Yorum
          <textarea
            value={yorum}
            onChange={(e) => setYorum(e.target.value)}
            type="text"
            rows="5"
          ></textarea>
        </label>
        {yorumError && <p className="hata">{yorumError}</p>}
        <button type="submit" className="btn">
          Yorum ekle
        </button>
      </form>
      <div className="yorumlar">
        {yorumlarPending ? (
          <p>loading...</p>
        ) : yorumlar.length > 0 ? (
          yorumlar
            .sort((a, b) => {
              return new Date(b.tarih) - new Date(a.tarih);
            })
            .map((yorum) => (
              <Yorum key={yorum.yorum_id} yorum={yorum} girmisUser={user} />
            ))
        ) : (
          <p style={{ fontSize: "14px", textAlign: "center" }}>
            İlk yorum ekleyen sen ol
          </p>
        )}
      </div>
    </div>
  );
}
