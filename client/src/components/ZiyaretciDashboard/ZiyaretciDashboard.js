import { useAuthContext } from "../../hooks/useAuthContext";

import "./ZiyaretciDashboard.css";
export default function ZiyaretciDashboard() {
  const { user } = useAuthContext();

  return <div>ZİYARETÇİ DASHBOARD hoşgeldin{user.name}</div>;
}
