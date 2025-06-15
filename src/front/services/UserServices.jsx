import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// GET list of Users
export const getUsers = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/users`);
    if (!resp.ok) throw new Error('Error getting users');
    // return await resp.json();
    // console.log(resp);
    const data = await resp.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET a user by ID
export const fetchUserById = async (userId) => {
  const numericId = Number(userId);
  if (isNaN(numericId)) {
    throw new Error("User ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/users/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Error fetching user");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create User
export const createUser = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/users`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating user');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update User
export const updateUser = async (userId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating user');
    return await resp.json();
  } catch (error) {
    throw error;
  }
};