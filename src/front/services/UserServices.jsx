import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const UserServices = () => {   
        
    const [users, setUsers] = useState([])
    useEffect(() => {

        console.log("Component Loading")
        getUsers()
    }, [])


    // GETs list of Users
    const getUsers = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users')
            if (!resp.ok) throw new Error('error getting users');
            const data = await resp.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };

};

// GET a user by ID
export const fetchUserById = async (userId) => {
  const numericId = Number(userId);
  if (isNaN(numericId)) {
    throw new Error("User ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users/${numericId}`
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
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users', {
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
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/users/${userId}`, {
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




   