// Import necessary components from react-router-dom and other parts of the application.
import { Pricing } from "../components/Pricing";
import { Link} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
export const PricingPage = () => { 
    return (
        <div className="container-fluid p-0">
            <Pricing/>
        </div>
    );
};