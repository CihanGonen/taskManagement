import "./PopUp.css";

export default function PopUp({ ClosePopUp, onButtonClick }) {
  return (
    <div className="popup-wrapper">
      <div className="close-btn-wrapper">
        <button onClick={() => ClosePopUp(false)} className="close-btn">
          x
        </button>
      </div>
      <div className="popup-bottom">
        <p>İşleme devam etmek istiyor musunuz?</p>
        <button onClick={onButtonClick} className="btn">
          Evet
        </button>
      </div>
    </div>
  );
}
