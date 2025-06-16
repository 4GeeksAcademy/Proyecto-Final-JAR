import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

//Asyncronous fetch
export const CategoryServices = () => {   
    
    
    const [categories, setCategories] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getCategories()
    }, [])


    // GETs list of Categories
    const getCategories = async () => {
        try {
            const resp = await fetch(`${backendUrl}/api/categories`)
            if (!resp.ok) throw new Error('error getting Categories');
            const data = await resp.json();
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };
};
// GET a category by ID
export const fetchCategoryById = async (categoryId) => {
  const numericId = Number(categoryId);
  if (isNaN(numericId)) {
    throw new Error("Category ID must be a number");
  }
  try {
    const response = await fetch(
      `${backendUrl}/api/categories/${numericId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Category not found");
      }
      throw new Error("Error fetching category");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// POST Create Category **DOUBLE CHECK IT REQUIRED** NO ENDPOINT
export const createCategory = async (formData) => {
    try {
        const resp = await fetch(`${backendUrl}/api/categories`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error('Error creating category');
        return await resp.json();
    } catch (error) {
        throw error;
    }
}

// PUT Update Category
export const updateCategory = async (categoryId, formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/categories/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error('Error updating category');
    return await resp.json();
  } catch (error) {
    throw error;
  }
}