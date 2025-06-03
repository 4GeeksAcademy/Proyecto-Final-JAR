// Import necessary components from react-router-dom and other parts of the application.
import { Signup } from "../components/Signup";
import { Link} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
export const SignupPage = () => { 
    return (
        <div className="container">
            <Signup/>
        </div>
    );
};