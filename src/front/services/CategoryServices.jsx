import React, { useEffect, useState } from "react";

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
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/categories')
            if (!resp.ok) throw new Error('error getting Categories');
            const data = await resp.json();
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}