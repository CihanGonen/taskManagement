import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaleplerContext } from "../../hooks/useTaleplerContext";

import TalepCardPersonel from "../TalepCardPersonel/TalepCardPersonel";

import "./PersonelDashboard.css";
export default function PersonelDashboard() {
  const { user } = useAuthContext();
  const { talepler, talepPending } = useTaleplerContext();
  const [filter, setFilter] = useState("");

  const filterTalepler = (talepler) => {
    talepler = talepler.filter(
      (talep) => talep.durum_id !== 1 && talep.atanan_id === user.kullanici_id
    );
    if (filter === "atanmis") {
      return talepler.filter((talep) => talep.durum_id === 2);
    } else if (filter === "bitmis") {
      return talepler.filter((talep) => talep.durum_id === 3);
    } else {
      return talepler;
    }
  };

  return (
    <div>
      <div className="filter">
        <p onClick={() => setFilter("")} className="hepsi-filter filter-option">
          All
        </p>
        <p
          onClick={() => setFilter("atanmis")}
          className="atanmis-filter filter-option"
        >
          Assigned
        </p>
        <p
          onClick={() => setFilter("bitmis")}
          className="bitmis-filter filter-option"
        >
          Finished
        </p>
      </div>
      <div className="talepler-wrapper">
        {talepPending ? (
          "loading..."
        ) : filterTalepler(talepler).length > 0 ? (
          filterTalepler(talepler).map((talep) => (
            <TalepCardPersonel key={talep.talep_id} talep={talep} />
          ))
        ) : (
          <p>no {filter} ticket</p>
        )}
      </div>
    </div>
  );
}
