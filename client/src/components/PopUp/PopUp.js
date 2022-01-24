import { useState } from "react";
import "./PopUp.css";

export default function PopUp({ ClosePopUp, onButtonClick }) {
  const [aciklama, setAciklama] = useState("");
  const [aciklamaError, setAciklamaError] = useState("");

  return (
    <div className="popup-wrapper">
      <div className="close-btn-wrapper">
        <button onClick={() => ClosePopUp(false)} className="close-btn">
          x
        </button>
      </div>
      <div className="popup-bottom">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <label
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            Açıklama
            <textarea
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              type="text"
              rows="5"
            ></textarea>
          </label>
          <button
            onClick={(e) => {
              if (!aciklama) {
                setAciklamaError("lütfen bir açıklama ekleyiniz.");
                return;
              }
              onButtonClick(e, aciklama);
            }}
            className="btn"
          >
            Kapat
          </button>
          {aciklamaError && <p className="hata">{aciklamaError}</p>}
        </form>
      </div>
    </div>
  );
}
