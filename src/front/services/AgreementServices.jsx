import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const AgreementServices = () => {   
    
    
    const [agreements, setAgreements] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getAgreements()
    }, [])


    // GETs list of Agreements
    const getAgreements = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/agreements')
            if (!resp.ok) throw new Error('error getting Agreements');
            const data = await resp.json();
            setAgreements(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};

// GET an agreement by ID
export const fetchAgreementById = async (agreementId) => {
  const numericId = Number(agreementId);
  if (isNaN(numericId)) {
    throw new Error("Agreement ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/agreements/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Agreement not found");
      }
      throw new Error("Error fetching agreement");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Agreement **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createAgreement = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/agreements', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating agreement');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Agreement
export const updateAgreement = async (agreementId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/agreements/${agreementId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating agreement');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}