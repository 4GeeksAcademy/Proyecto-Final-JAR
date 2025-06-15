import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const CommentServices = () => {   
    
    
    const [comments, setComments] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getComments()
    }, [])


    // GETs list of Comments
    const getComments = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/comments')
            if (!resp.ok) throw new Error('error getting Comments');
            const data = await resp.json();
            setComments(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};

// GET a comment by ID
export const fetchCommentById = async (commentId) => {
  const numericId = Number(commentId);
  if (isNaN(numericId)) {
    throw new Error("Comment ID must be a number");
  }
  try {
    const response = await fetch(
      `https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/comments/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Comment not found");
      }
      throw new Error("Error fetching comment");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Comment **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createComment = async (formData) => {
    try {
        const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/comments', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating comment');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Comment
export const updateComment = async (commentId, formData) => {
  try {
    const resp = await fetch(`https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating comment');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}