// Import necessary components from react-router-dom and other parts of the application.
import { Link} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

import {Profile} from "../components/Profile"
import { UserForm } from './CreateUser.jsx'


export const UserProfile = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      <Profile />
      <UserForm />

    </div>
  );
};
