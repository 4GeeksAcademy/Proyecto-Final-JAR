import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// GET list of posts
export const getPosts = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/posts`);
    if (!resp.ok) throw new Error('Error getting posts');
    return await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET a post by ID
// GET posts by client ID
export const fetchPostsByClient = async (clientId) => {
  const numericId = Number(clientId);
  if (isNaN(numericId)) {
    throw new Error("Client ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/posts/client/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No posts found for this client");
      }
      throw new Error("Error fetching posts");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Post 
export const createPost = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please log in again.");
  }

  // 👇 Log para depurar lo que se envía al servidor
  console.log("POST DATA:", formData);

  try {
    const resp = await fetch(`${backendUrl}/api/posts`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      if (resp.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error('Error creating post');
    }

    return await resp.json();
  } catch (error) {
    throw error;
  }
};



// PUT Update Post
export const updatePost = async (postId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating post');
    return await resp.json();
  } catch (error) {
    throw error;
  }
};





