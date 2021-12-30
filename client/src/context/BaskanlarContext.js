import { createContext, useEffect, useState } from "react";

export const BaskanlarContext = createContext();

export const BaskanlarContextProvider = (props) => {
  const [baskanlarBaskanlikIdler, setBaskanlarBaskanlikIdler] = useState([]);

  const fetchBaskanlar = async () => {
    try {
      let res = await fetch("http://localhost:5000/baskanlar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resBaskan = await res.json();

      setBaskanlarBaskanlikIdler(resBaskan);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBaskanlar();
  }, []);

  return (
    <BaskanlarContext.Provider value={{ baskanlarBaskanlikIdler }}>
      {props.children}
    </BaskanlarContext.Provider>
  );
};
