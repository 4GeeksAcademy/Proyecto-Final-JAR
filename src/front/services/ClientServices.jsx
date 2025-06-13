import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const ClientServices = () => {   
    
    
    const [clients, setClients] = useState()
    useEffect(() => {

        console.log("Component Loading")
        getClients()
    }, [])


    // GETs list of Clients
    const getClients = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/clients')
            if (!resp.ok) throw new Error('error getting Clients');
            const data = await resp.json();
            setClients(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};

// GET a client by ID
export const fetchClientById = async (clientId) => {
  const numericId = Number(clientId);
  if (isNaN(numericId)) {
    throw new Error("Client ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/clients/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Client not found");
      }
      throw new Error("Error fetching client");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST AND PUT NOT NEEDED FOR CLIENTS AS PER THE ENDPOINTS IN BACK-END