import { useAuthContext } from "../../hooks/useAuthContext";

import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import ZiyaretciDashboard from "../../components/ZiyaretciDashboard/ZiyaretciDashboard";
import BaskanDashboard from "../../components/BaskanDashboard/BaskanDashboard";
import PersonelDashboard from "../../components/PersonelDashboard/PersonelDashboard";

export default function Dashboard() {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <div>
          {user.yetki_id === 1 ? (
            <AdminDashboard />
          ) : user.yetki_id === 2 ? (
            <BaskanDashboard />
          ) : user.yetki_id === 3 ? (
            <PersonelDashboard />
          ) : user.yetki_id === 4 ? (
            <ZiyaretciDashboard />
          ) : (
            <div>kimsin lan ?</div>
          )}
        </div>
      ) : (
        <div>yok user</div>
      )}
    </>
  );
}
