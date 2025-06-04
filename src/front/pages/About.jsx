// Import necessary components from react-router-dom and other parts of the application.
import { About } from "../components/About";
import { Link} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.


export const AboutPage = () => { 
    return (
        <div className="container">
            <About/>
        </div>
    );
};