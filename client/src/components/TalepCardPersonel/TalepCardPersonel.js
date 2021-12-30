import "./TalepCardPersonel.css";

import { Link } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function TalepCardPersonel({ talep }) {
  const getFormattedTarih = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  return (
    <Link to={`/talep/${talep.talep_id}`}>
      <div className="talep-card">
        <div className="tarih">
          <p>Assigned; {getFormattedTarih(talep.atanma_zamani)}</p>
        </div>
        <p>
          {talep.tanim.length > 80
            ? talep.tanim.substring(0, 80) + "..."
            : talep.tanim}
        </p>
        <div className="talep-durumlar">
          {talep.durum_id === 2 ? (
            <p className="talep-durum atanmisBaskan">Assigned</p>
          ) : talep.durum_id === 3 ? (
            <p className="talep-durum bitmisBaskan">Finished</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
