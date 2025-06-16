import { Dashboard } from "../components/Dashboard";
import { Link} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const DashboardPage = () => { 
    return (
        <div className="container">
            <Dashboard />
        </div>
    );
};