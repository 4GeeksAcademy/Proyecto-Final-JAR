import { Login } from "../components/Login";
import { Link} from "react-router-dom";
import { ProfessionalDashboard } from "../components/ProfDash";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.


export const LoginPage = () => { 
    return (
        <div className="container">
            <Login/>
            <ProfessionalDashboard />
        </div>
    );
};