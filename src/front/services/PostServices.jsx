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
export const fetchPostById = async (postId) => {
  const numericId = Number(postId);
  if (isNaN(numericId)) {
    throw new Error("Post ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/posts/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Post not found");
      }
      throw new Error("Error fetching post");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Post **DOUBLE CHECK IT REQUIRED** NO ENDPOINT **********************************NEEDED!!!
export const createPost = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/posts`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating post');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Post
export const updatePost = async (postId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/posts/${postId}`, {
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