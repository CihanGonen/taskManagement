import { createContext, useEffect, useState } from "react";

export const KullaniciContext = createContext();

export const KullaniciContextProvider = (props) => {
  const [kullanici, setKullanici] = useState({});

  const fetchKullanici = async (kullanici_id) => {};

  return (
    <KullaniciContext.Provider value={{ kullanici, fetchKullanici }}>
      {props.children}
    </KullaniciContext.Provider>
  );
};
