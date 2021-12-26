import { createContext, useEffect, useState } from "react";

export const DbContext = createContext();

export const DbContextProvider = (props) => {
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
    <DbContext.Provider
      value={{ baskanliklar, setBaskanliklar, fetchBaskanliklar }}
    >
      {props.children}
    </DbContext.Provider>
  );
};
