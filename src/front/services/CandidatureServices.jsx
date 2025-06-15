import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


//Asyncronous fetch TO REMOVE
export const CandidatureServices = () => {   
    
    
    const [candidatures, setCandidatures] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getCandidatures()
    }, [])


    // GETs list of Candidatures
    const getCandidatures = async () => {
        try {
            const resp = await fetch(`${backendUrl}/api/candidatures`)
            if (!resp.ok) throw new Error('error getting Candidatures');
            const data = await resp.json();
            setCandidatures(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };

};

// GET a candidature by ID
export const fetchCandidatureById = async (candidatureId) => {
  const numericId = Number(candidatureId);
  if (isNaN(numericId)) {
    throw new Error("Candidature ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/candidatures/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Candidature not found");
      }
      throw new Error("Error fetching candidature");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Candidature **DOUBLE CHECK IT REQUIRED** NO ENDPOINT *** NEEDED
export const createCandidature = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/candidatures`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating candidature');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Candidature
export const updateCandidature = async (candidatureId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/candidatures/${candidatureId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating candidature');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}

