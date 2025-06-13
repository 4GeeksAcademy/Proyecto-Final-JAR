import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const CandidatureServices = () => {   
    
    
    const [candidatures, setCandidatures] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getCandidatures()
    }, [])


    // GETs list of Candidatures
    const getCandidatures = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/candidatures')
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
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/candidatures/${numericId}`
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

// POST Create Candidature
export const createCandidature = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/candidatures', {
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
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/candidatures/${candidatureId}`, {
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