import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const RatingServices = () => {   
    
    
    const [ratings, setRatings] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getRatings()
    }, [])


    // GETs list of Ratings
    const getRatings = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/ratings')
            if (!resp.ok) throw new Error('error getting Ratings');
            const data = await resp.json();
            setRatings(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};
// GET a rating by ID
export const fetchRatingById = async (ratingId) => {
  const numericId = Number(ratingId);
  if (isNaN(numericId)) {
    throw new Error("Rating ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/ratings/${numericId}`
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

// POST Create Rating
export const createRating = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/ratings', {
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

// PUT Update Rating
export const updateRating = async (ratingId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/ratings/${ratingId}`, {
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