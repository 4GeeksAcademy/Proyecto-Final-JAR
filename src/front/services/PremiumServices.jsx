import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// GET list of premiums
export const getPremiums = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/premiums`);
    if (!resp.ok) throw new Error('Error getting premiums');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// GET a premium by ID
export const fetchPremiumById = async (premiumId) => {
  const numericId = Number(premiumId);
  if (isNaN(numericId)) {
    throw new Error("Premium ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/premiums/${numericId}`
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

// POST Create Premium **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createPremium = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/premiums`, {
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
    const resp = await fetch(`${backendUrl}/api/premiums/${premiumId}`, {
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