import "./TalepDetay.css";

import PopUp from "../../components/PopUp/PopUp";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaleplerContext } from "../../hooks/useTaleplerContext";
import { usePersonellerContext } from "../../hooks/usePersonellerContext";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Yorumlar from "../../components/Yorumlar/Yorumlar";
import { useFetchKullanici } from "../../hooks/useFetchKullanici";

export default function TalepDetay() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { talepler, talepPending, fetchTalepler } = useTaleplerContext();
  const { personeller, fetchPersoneller } = usePersonellerContext();
  const fetchKullanici = useFetchKullanici();

  const [talepAtandi, setTalepAtandi] = useState(false);
  const [talep, setTalep] = useState();
  const [selectedPersonel, setSelectedPersonel] = useState(0);
  const [talepkar, setTalepkar] = useState("");
  const [atanan, setAtanan] = useState("");

  const [showKapatPopUp, setShowKapatPopUp] = useState(false);
  const [showBitirPopUp, setShowBitirPopUp] = useState(false);

  const [personelError, setPersonelError] = useState("");

  const { id } = useParams();

  const getFormattedTarih = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  // uygun talep getirilir
  useEffect(() => {
    if (talepler) {
      setTalep(talepler.filter((talep) => talep.talep_id === Number(id))[0]);
    }
  }, [talepler, id]);

  // personel seçmek için personeller getirilir
  useEffect(() => {
    fetchPersoneller(user.baskanlik_id);
  }, [fetchPersoneller, user]);

  //talep gönderildi bildirimi
  useEffect(() => {
    if (talepAtandi) {
      const timer = setTimeout(() => setTalepAtandi(false), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [talepAtandi]);

  useEffect(() => {
    const fetch = async () => {
      const resTalepkar = await fetchKullanici(talep.talepkar_id);
      setTalepkar(resTalepkar.email);
      if (talep.atanan_id) {
        const resAtanan = await fetchKullanici(talep.atanan_id);
        setAtanan(resAtanan.email);
      }
    };
    if (talep) {
      fetch();
    }
  }, [talep]);

  const talepAta = async (e) => {
    e.preventDefault();
    setPersonelError("");
    if (!selectedPersonel) {
      setPersonelError("Lütfen geçerli bir personel seçiniz");
      return;
    } else {
      try {
        await fetch(`http://localhost:5000/talep/${talep.talep_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ atanan_id: selectedPersonel }),
        });
        fetchTalepler();
        setTalepAtandi(true);
      } catch (err) {
        console.log(err.message);
      }
    }
    setPersonelError("");
  };

  const talepAciklamaEkle = async (aciklama) => {
    const aciklamaValues = { aciklama };

    try {
      await fetch(`http://localhost:5000/talep/aciklama/${talep.talep_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aciklamaValues),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onTalepBitirClick = async (e, aciklama) => {
    e.preventDefault();
    talepAciklamaEkle(aciklama);
    try {
      await fetch(`http://localhost:5000/talep/bitir/${talep.talep_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchTalepler();
    } catch (err) {
      console.log(err.message);
    }
    setShowBitirPopUp(false);
  };

  return (
    <div>
      {showBitirPopUp && (
        <PopUp
          ClosePopUp={setShowBitirPopUp}
          onButtonClick={onTalepBitirClick}
        />
      )}
      {showKapatPopUp && (
        <PopUp
          ClosePopUp={setShowKapatPopUp}
          onButtonClick={onTalepBitirClick}
        />
      )}

      {talepPending ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : talep &&
        (user.kullanici_id === talep.atayan_id ||
          user.kullanici_id === talep.atanan_id) ? (
        <div className="talep-detay-wrapper">
          <div className="talep-detay-card">
            <div className="talep-top-side">
              <div className="talep-times">
                <p>Açılma zamanı; {getFormattedTarih(talep.acilma_zamani)}</p>
                {talep.atanan_id && (
                  <p>Atanma zamanı; {getFormattedTarih(talep.atanma_zamani)}</p>
                )}
              </div>
              <div>
                {user.yetki_id === 2 && talep.durum_id !== 4 && (
                  <button
                    onClick={() => setShowKapatPopUp(true)}
                    className="btn btn-talep-kapat"
                  >
                    Talebi kapat
                  </button>
                )}
              </div>
            </div>

            <div className="talep-tanim">{talep.tanim}</div>
            <div>
              <div className="talep-infos">
                <div>
                  {talep.durum_id === 2 && user.yetki_id === 3 && (
                    <button
                      onClick={() => setShowBitirPopUp(true)}
                      className="btn bitir-btn"
                    >
                      Talebi bitir
                    </button>
                  )}
                </div>
                <div className="talep-kisiler">
                  <p>{talepkar && talepkar} tarafından oluşturuldu</p>
                  {talep.durum_id !== 1 && <p>{atanan && atanan}'a atandı</p>}
                </div>
              </div>
              {talep.durum_id === 1 && (
                <form onSubmit={talepAta} className="personel-form">
                  <label>
                    <h4>Atanacak personeli seç</h4>
                    <select
                      value={selectedPersonel}
                      onChange={(e) =>
                        setSelectedPersonel(Number(e.target.value))
                      }
                    >
                      <option value="">bir personel seç</option>
                      {personeller &&
                        personeller.map((personel) => (
                          <option
                            key={personel.kullanici_id}
                            value={personel.kullanici_id}
                          >
                            {personel.email}
                          </option>
                        ))}
                    </select>
                  </label>
                  <button type="submit" className="btn">
                    Ata
                  </button>
                  {personelError && <p className="hata">{personelError}</p>}
                </form>
              )}
              {talepAtandi && (
                <div className="bildirim">Talep başarıyla atandı.</div>
              )}
            </div>
          </div>
          <div className="talep-detay-yorumlar">
            <Yorumlar user={user} talep_id={talep.talep_id} />
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "60px" }}>No ticket</h1>
      )}
    </div>
  );
}
