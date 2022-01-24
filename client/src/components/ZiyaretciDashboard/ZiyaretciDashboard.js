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
        (talep) => talep.durum_id === 2 || talep.durum_id === 1
      );
    } else if (filter === "sonuclanan") {
      return talepler.filter((talep) => talep.durum_id === 3);
    } else {
      return talepler.filter((talep) => talep.durum_id !== 3);
    }
  };

  return (
    <div>
      <div className="filter">
        <p onClick={() => setFilter("")} className="hepsi-filter filter-option">
          Hepsi
        </p>
        <p
          onClick={() => setFilter("beklemede")}
          className="atanmis-filter filter-option"
        >
          Beklemede
        </p>
        <p
          onClick={() => setFilter("sonuclanan")}
          className="bitmis-filter filter-option"
        >
          Sonuçlanan
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
          <p>hiç {filter} talep yok</p>
        )}
      </div>
    </div>
  );
}
