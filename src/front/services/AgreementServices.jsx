import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL

// GET list of agreements
export const getAgreements = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/agreements`);
    if (!resp.ok) throw new Error('Error getting agreements');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET an agreement by ID
export const fetchAgreementById = async (agreementId) => {
  const numericId = Number(agreementId);
  if (isNaN(numericId)) {
    throw new Error("Agreement ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/agreements/${numericId}`
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

export const createAgreement = async (formData, token) => {
  try {
    const resp = await fetch(`${backendUrl}/api/agreements`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        agreement_status: formData.agreement_status.toUpperCase()
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.error || 'Error creating agreement');
    }
    
    return await resp.json();
  } catch (error) {
    throw error;
  }
}


// PUT Update Agreement
export const updateAgreement = async (agreementId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/agreements/${agreementId}`, {
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