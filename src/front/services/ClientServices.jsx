import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// GET list of Clients
export const getClients = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/clients`);
    if (!resp.ok) throw new Error('Error getting clients');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET a client by ID
export const fetchClientById = async (clientId) => {
  const numericId = Number(clientId);
  if (isNaN(numericId)) {
    throw new Error("Client ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/clients/${numericId}`
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