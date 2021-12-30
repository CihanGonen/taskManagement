import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaleplerContext } from "../../hooks/useTaleplerContext";

import TalepCardZiyaretci from "../TalepCardZiyaretci/TalepCardZiyaretci";
import "./ZiyaretciDashboard.css";
export default function ZiyaretciDashboard() {
  const { user } = useAuthContext();

  const { talepler, talepPending, fetchTalepler } = useTaleplerContext();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTalepler();
  }, []);

  const filterTalepler = (talepler) => {
    talepler = talepler.filter(
      (talep) => talep.talepkar_id === user.kullanici_id
    );
    if (filter === "beklemede") {
      return talepler.filter(
        (talep) =>
          talep.durum_id === 2 || talep.durum_id === 1 || talep.durum_id === 3
      );
    } else if (filter === "sonuclanan") {
      return talepler.filter((talep) => talep.durum_id === 4);
    } else {
      return talepler.filter((talep) => talep.durum_id !== 4);
    }
  };

  return (
    <div>
      <div className="filter">
        <p onClick={() => setFilter("")} className="hepsi-filter filter-option">
          All
        </p>
        <p
          onClick={() => setFilter("beklemede")}
          className="atanmis-filter filter-option"
        >
          Pending
        </p>
        <p
          onClick={() => setFilter("sonuclanan")}
          className="bitmis-filter filter-option"
        >
          Closed
        </p>
      </div>
      <div className="talepler-wrapper">
        {talepPending ? (
          "loading..."
        ) : filterTalepler(talepler).length > 0 ? (
          filterTalepler(talepler).map((talep) => (
            <TalepCardZiyaretci key={talep.talep_id} talep={talep} />
          ))
        ) : (
          <p>no {filter} ticket</p>
        )}
      </div>
    </div>
  );
}
