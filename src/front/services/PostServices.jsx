import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const PostServices = () => {   
    
    
    const [posts, setPosts] = useState()
    useEffect(() => {

        console.log("Component Loading")
        getPosts()
    }, [])


    // GET list of Posts
    const getPosts = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/posts')
            if (!resp.ok) throw new Error('error getting Posts');
            const data = await resp.json();
            setPosts(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };

};

// GET a post by ID
export const fetchPostById = async (postId) => {
  const numericId = Number(postId);
  if (isNaN(numericId)) {
    throw new Error("Post ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/posts/${numericId}`
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

// POST Create Post
export const createPost = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/posts', {
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
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/posts/${postId}`, {
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