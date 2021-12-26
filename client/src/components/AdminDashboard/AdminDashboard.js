import { useEffect, useState } from "react";
import AddBolumForm from "../AddBolumForm/AddBolumForm";
import AddKullaniciForm from "../AddKullaniciForm/AddKullaniciForm";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [durumlar, setDurumlar] = useState([]);

  const fetchTalepInfos = async () => {
    try {
      let res = await fetch("http://localhost:5000/talep", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const talepDurum = await res.json();
      setDurumlar(talepDurum);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTalepInfos();
  }, []);

  return (
    <div className="admin-dashboard-wrapper">
      <div className="topside">
        <div className="topsideBox total">
          <h5>Toplam Talep</h5>
          <h2>{durumlar.length}</h2>
        </div>
        <div className="topsideBox acilmis">
          <h5>Kullanıcı Tarafından Oluşturulan</h5>
          <h2>{durumlar.filter((durum) => durum.durum_id === 1).length}</h2>
        </div>
        <div className="topsideBox atanmis">
          <h5>Başkan Tarafından Personele Atanmış</h5>
          <h2>{durumlar.filter((durum) => durum.durum_id === 2).length}</h2>
        </div>
        <div className="topsideBox bitmis">
          <h5>Personel Tarafından Bittiği Onaylanmış</h5>
          <h2>{durumlar.filter((durum) => durum.durum_id === 3).length}</h2>
        </div>
        <div className="topsideBox kapanmis">
          <h5>Bölüm Başkanı Tarafından Kapatılmış</h5>
          <h2>{durumlar.filter((durum) => durum.durum_id === 4).length}</h2>
        </div>
      </div>
      <div className="bottom-side">
        <AddBolumForm />
        <AddKullaniciForm />
      </div>
    </div>
  );
}
