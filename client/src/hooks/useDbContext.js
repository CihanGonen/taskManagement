import { DbContext } from "../context/DbContext";
import { useContext } from "react";

export const useDbContext = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("dbContext must be inside a provider");
  }
  return context;
};
