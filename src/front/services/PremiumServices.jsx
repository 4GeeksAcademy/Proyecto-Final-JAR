import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const PremiumServices = () => {   
    
    
    const [premiums, setPremiums] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getPremiums()
    }, [])


    // GETs list of Premiums
    const getPremiums = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/premiums')
            if (!resp.ok) throw new Error('error getting Premiums');
            const data = await resp.json();
            setPremiums(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};

// GET a premium by ID
export const fetchPremiumById = async (premiumId) => {
  const numericId = Number(premiumId);
  if (isNaN(numericId)) {
    throw new Error("Premium ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/premiums/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Premium not found");
      }
      throw new Error("Error fetching premium");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Premium
export const createPremium = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/premiums', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating premium');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Premium
export const updatePremium = async (premiumId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/premiums/${premiumId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating premium');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}