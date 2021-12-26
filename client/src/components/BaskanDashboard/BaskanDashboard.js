import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import TalepCard from "../TalepCard/TalepCard";

import "./BaskanDashboard.css";
export default function BaskanDashboard() {
  const { user } = useAuthContext();
  const [talepler, setTalepler] = useState([]);

  const fetchTalepler = async () => {
    try {
      let res = await fetch("http://localhost:5000/talep", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resTalep = await res.json();
      setTalepler(resTalep);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTalepler();
  }, []);

  return (
    <div>
      {/* atanmamış,atanmış,bitmiş talepler */}
      <h5 style={{ textAlign: "center" }}>BAŞKAN DASHBOARD</h5>
      <div className="filter">
        <p className="atanmis-filter filter-option">Atanmış</p>
        <p className="atanmamis-filter filter-option">Atanmamış</p>
        <p className="kapanmis-filter filter-option">Kapanmış</p>
      </div>
      <div className="talepler-wrapper">
        {talepler.length > 1 ? (
          talepler.map((talep) => (
            <TalepCard key={talep.talep_id} talep={talep} />
          ))
        ) : (
          <p>hiç talep yok</p>
        )}
      </div>
    </div>
  );
}
