import { useState } from "react";

import { useDbContext } from "../../hooks/useDbContext";

import "./AddBolumForm.css";

export default function AddBolumForm() {
  const [baskanlik, setBaskanlik] = useState("");
  const [ustBaskanlik, setUstBaskanlik] = useState("");

  const { baskanliklar, fetchBaskanliklar, setBaskanliklar } = useDbContext();

  const onBaskanlikFormSubmit = async (e) => {
    e.preventDefault();
    const baskanlikValues = { adi: baskanlik, ustBaskanlik };
    try {
      let res = await fetch("http://localhost:5000/baskanlik", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baskanlikValues),
      });
      const resBaskanlik = await res.json();
      setBaskanliklar((prevBaskanliklar) => [
        ...prevBaskanliklar,
        resBaskanlik,
      ]);
    } catch (err) {
      console.log(err.message);
    }
    setBaskanlik("");
    setUstBaskanlik("");
    fetchBaskanliklar();
  };

  return (
    <div className="bolum-form">
      <h2>Başkanlık Ekle</h2>
      <form onSubmit={onBaskanlikFormSubmit}>
        <label className="baskanlik-label">
          Başkanlık
          <input
            type="text"
            value={baskanlik}
            onChange={(e) => setBaskanlik(e.target.value)}
          />
        </label>
        <label className="ust-baskanlik-label">
          Üst Başkanlık
          <select
            value={ustBaskanlik}
            onChange={(e) => setUstBaskanlik(e.target.value)}
          >
            <option />
            {baskanliklar &&
              baskanliklar.map((baskanlik) => (
                <option key={baskanlik.baskanlik_id} value={baskanlik.adi}>
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
