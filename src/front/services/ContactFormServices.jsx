import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL


// POST: Create a new ContactForm entry
export const createContactForm = async (formData) => {
  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Handle specific error statuses
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Validation error');
      }
      throw new Error('Error submitting contact form');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};
