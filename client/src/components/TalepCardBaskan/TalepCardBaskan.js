import "./TalepCardBaskan.css";

import { Link } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function TalepCardBaskan({ talep }) {
  const getFormattedTarih = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  return (
    <Link to={`/talep/${talep.talep_id}`}>
      <div className="talep-card">
        <div className="tarih">
          <p>Açıldı; {getFormattedTarih(talep.acilma_zamani)}</p>
          {talep.atanma_zamani && (
            <p>Atandı; {getFormattedTarih(talep.atanma_zamani)}</p>
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
    </Link>
  );
}
