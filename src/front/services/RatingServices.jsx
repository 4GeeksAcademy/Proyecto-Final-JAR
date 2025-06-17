import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// GET list of Ratings
export const getRatings = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/ratings`);
    if (!resp.ok) throw new Error('Error getting ratings');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET a rating by ID
export const fetchRatingById = async (ratingId) => {
  const numericId = Number(ratingId);
  if (isNaN(numericId)) {
    throw new Error("Rating ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/ratings/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Rating not found");
      }
      throw new Error("Error fetching rating");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Rating **DOUBLE CHECK IT REQUIRED** NO ENDPOINT*******************************************************
export const createRating = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/ratings`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating rating');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Rating **DOUBLE CHECK IT REQUIRED** NO ENDPOINT *******************************************************
export const updateRating = async (ratingId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/ratings/${ratingId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating rating');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}