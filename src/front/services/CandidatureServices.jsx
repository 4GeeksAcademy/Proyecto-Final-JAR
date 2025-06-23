import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// GET list of candidatures
export const getCandidatures = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/candidatures`);
    if (!resp.ok) throw new Error('Error getting candidature');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
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

// POST Create Candidature 
export const createCandidature = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // o como guardes el token
    const resp = await fetch(`${backendUrl}/api/candidatures`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  // <--- aquí el token
      }
    });
    if (!resp.ok) throw new Error('Error creating candidature');
    return await resp.json();
  } catch (error) {
    throw error;
  }
};

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
};

// GET candidatures per professional
export const getProfessionalCandidatures = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing'); // Add validation
  
  try {
    const resp = await fetch(`${backendUrl}/api/professional/candidatures`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Response logging:
    console.log("API Response Status:", resp.status);
    const data = await resp.json();
    console.log("API Response Data:", data);
    
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: Failed to fetch candidatures`);
    return data;
  } catch (error) {
    console.error("Fetch error details:", error);
    throw error;
  }
};