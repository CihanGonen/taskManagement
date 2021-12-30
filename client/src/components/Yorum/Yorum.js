import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";
import "./Yorum.css";

import { useFetchKullanici } from "../../hooks/useFetchKullanici";

export default function Yorum({ yorum, girmisUser }) {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [formattedTarih, setFormattedTarih] = useState("");

  const fetchKullanici = useFetchKullanici();

  useEffect(() => {
    const GetKullaniciAdi = async () => {
      const kullanici = await fetchKullanici(yorum.kullanici_id);
      setKullaniciAdi(kullanici.name);
    };
    GetKullaniciAdi();
    const format = formatDistanceToNow(new Date(yorum.tarih), {
      addSuffix: true,
    });
    setFormattedTarih(format);
  }, [yorum]);

  return (
    <div className="yorum-wrapper">
      <p className="tarih">{formattedTarih}</p>
      <p>{yorum.icerik}</p>
      {kullaniciAdi && (
        <p className="kullanici-adi">
          -{girmisUser.name === kullaniciAdi ? "you" : kullaniciAdi}
        </p>
      )}
    </div>
  );
}
