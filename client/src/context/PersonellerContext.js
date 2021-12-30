import { createContext, useEffect, useState } from "react";

export const PersonellerContext = createContext();

export const PersonellerContextProvider = (props) => {
  const [personeller, setPersoneller] = useState([]);

  const fetchPersoneller = async (baskanlik_id) => {
    try {
      let res = await fetch("http://localhost:5000/personel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baskanlik_id }),
      });
      const resPersonel = await res.json();
      setPersoneller(resPersonel);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <PersonellerContext.Provider
      value={{ personeller, setPersoneller, fetchPersoneller }}
    >
      {props.children}
    </PersonellerContext.Provider>
  );
};
