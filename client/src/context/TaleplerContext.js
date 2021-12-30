import { createContext, useEffect, useState } from "react";

export const TaleplerContext = createContext();

export const TaleplerContextProvider = (props) => {
  const [talepler, setTalepler] = useState([]);
  const [talepPending, setTalepPending] = useState([]);

  const fetchTalepler = async () => {
    try {
      setTalepPending(true);
      let res = await fetch("http://localhost:5000/talep", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resTalep = await res.json();
      setTalepler(resTalep);
      setTalepPending(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTalepler();
  }, []);

  return (
    <TaleplerContext.Provider
      value={{ talepler, talepPending, setTalepler, fetchTalepler }}
    >
      {props.children}
    </TaleplerContext.Provider>
  );
};
