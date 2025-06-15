import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const ProfessionalServices = () => {   
    
    
    const [professionals, setProfessionals] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getProfessionals()
    }, [])


    // GETs list of Professionals
    const getProfessionals = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/professionals')
            if (!resp.ok) throw new Error('error getting professionals');
            const data = await resp.json();
            setProfessionals(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };

}

// GET a professional by ID
export const fetchProfessionalById = async (professionalId) => {
  const numericId = Number(professionalId);
  if (isNaN(numericId)) {
    throw new Error("Professional ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/professionals/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Professional not found");
      }
      throw new Error("Error fetching professional");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Professional **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createProfessional = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/professionals', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating professional');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Professional
export const updateProfessional = async (professionalId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/professionals/${professionalId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating professional');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}