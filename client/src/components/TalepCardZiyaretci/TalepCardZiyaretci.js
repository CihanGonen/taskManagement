import "./TalepCardZiyaretci.css";

import { Link } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function TalepCardZiyaretci({ talep }) {
  const getFormattedTarih = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  return (
    <Link to={`/talep/${talep.talep_id}`}>
      <div className="talep-card">
        <div className="tarih">
          <p>Açıldı; {getFormattedTarih(talep.acilma_zamani)}</p>
        </div>
        <p>
          {talep.tanim.length > 80
            ? talep.tanim.substring(0, 80) + "..."
            : talep.tanim}
        </p>
        {talep.aciklama && (
          <p style={{ fontSize: "13px" }}>
            <span style={{ color: "red" }}>Sistem Açıklaması; </span>
            {talep.aciklama}
          </p>
        )}
        <div className="talep-durumlar">
          {talep.durum_id === 1 || talep.durum_id === 2 ? (
            <p className="talep-durum atanmisBaskan">Beklemede</p>
          ) : talep.durum_id === 3 ? (
            <p className="talep-durum bitmisBaskan">Kapandı</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
