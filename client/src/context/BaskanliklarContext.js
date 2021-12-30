import { createContext, useEffect, useState } from "react";

export const BaskanliklarContext = createContext();

export const BaskanliklarContextProvider = (props) => {
  const [baskanliklar, setBaskanliklar] = useState([]);

  const fetchBaskanliklar = async () => {
    try {
      let res = await fetch("http://localhost:5000/baskanlik", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resBaskanlik = await res.json();
      setBaskanliklar(resBaskanlik);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBaskanliklar();
  }, []);

  return (
    <BaskanliklarContext.Provider
      value={{ baskanliklar, setBaskanliklar, fetchBaskanliklar }}
    >
      {props.children}
    </BaskanliklarContext.Provider>
  );
};
