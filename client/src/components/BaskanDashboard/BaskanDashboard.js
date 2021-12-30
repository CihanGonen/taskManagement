import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaleplerContext } from "../../hooks/useTaleplerContext";

import TalepCardBaskan from "../TalepCardBaskan/TalepCardBaskan";

import "./BaskanDashboard.css";
export default function BaskanDashboard() {
  const { user } = useAuthContext();
  const { talepler, talepPending, fetchTalepler } = useTaleplerContext();
  const [filter, setFilter] = useState("");

  const filterTalepler = (talepler) => {
    talepler = talepler
      .filter((talep) => talep.atayan_id === user.kullanici_id)
      .filter((talep) => talep.durum_id !== 4);
    if (filter === "atanmamis") {
      return talepler.filter((talep) => talep.durum_id === 1);
    } else if (filter === "atanmis") {
      return talepler.filter((talep) => talep.durum_id === 2);
    } else if (filter === "bitmis") {
      return talepler.filter((talep) => talep.durum_id === 3);
    } else {
      return talepler;
    }
  };

  useEffect(() => {
    fetchTalepler();
  }, []);

  return (
    <div>
      <div className="filter">
        <p onClick={() => setFilter("")} className="hepsi-filter filter-option">
          All
        </p>
        <p
          onClick={() => setFilter("atanmamis")}
          className="atanmamis-filter filter-option"
        >
          Unassigned
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
          filterTalepler(talepler)
            .sort((a, b) => {
              return new Date(b.acilma_zamani) - new Date(a.acilma_zamani);
            })
            .map((talep) => (
              <TalepCardBaskan key={talep.talep_id} talep={talep} />
            ))
        ) : (
          <p>no {filter} ticket</p>
        )}
      </div>
    </div>
  );
}
