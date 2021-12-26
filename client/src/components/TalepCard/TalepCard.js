import "./TalepCard.css";

export default function TalepCard({ talep }) {
  const dateFormatter = (date) => {
    const shortenedDate = new Date(talep.acilma_zamani).toLocaleDateString();
    return shortenedDate.split(".").join("/");
  };

  return (
    <div className="talep-card">
      <div className="tarih">
        <p>Açılma Tarihi: {dateFormatter(talep.acilma_zamani)}</p>
        {talep.atanma_zamani && (
          <p>Atanma Tarihi: {dateFormatter(talep.atanma_zamani)}</p>
        )}
      </div>
      <p>
        {talep.tanim.length > 80
          ? talep.tanim.substring(0, 80) + "..."
          : talep.tanim}
      </p>
      <div className="talep-durumlar">
        {talep.durum_id === 1 ? (
          <p className="talep-durum atanmamisBaskan">Atanmamış</p>
        ) : talep.durum_id === 2 ? (
          <p className="talep-durum atanmisBaskan">Atanmış</p>
        ) : talep.durum_id === 3 ? (
          <p className="talep-durum bitmisBaskan">Bitmiş</p>
        ) : null}
      </div>
    </div>
  );
}
