import { Dashboard } from "../components/Dashboard";
import { ProfessionalDashboard } from "../components/ProfDash";
import { useEffect, useState } from "react";

export const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container">
      {user?.is_professional ? <ProfessionalDashboard /> : <Dashboard />}
    </div>
  );
};
