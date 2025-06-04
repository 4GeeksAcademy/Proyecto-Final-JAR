// Import necessary components from react-router-dom and other parts of the application.
import { Link} from "react-router-dom";
import { Signup } from "../components/Signup";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      
    </div>
  );
};
