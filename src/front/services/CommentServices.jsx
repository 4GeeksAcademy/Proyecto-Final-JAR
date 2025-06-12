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


}