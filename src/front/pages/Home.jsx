import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import { Search, ClipboardList, Monitor } from "lucide-react"

import "../../front/home.css"

import { ComponentHome } from "../components/Home.jsx";

export const Home = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
	<div className="container">
	  <ComponentHome />
	</div>
  );
};