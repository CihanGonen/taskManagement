import { useAuthContext } from "../../hooks/useAuthContext";

import "./PersonelDashboard.css";
export default function PersonelDashboard() {
  const { user } = useAuthContext();

  return <div>PERSONEL DASHBOARD hoşgeldin {user.name}</div>;
}
