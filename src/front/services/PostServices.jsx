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

}