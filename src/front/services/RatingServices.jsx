import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const RatingServices = () => {   
    
    
    const [ratings, setRatings] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getRatings()
    }, [])


    // GETs list of Ratings
    const getRatings = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/ratings')
            if (!resp.ok) throw new Error('error getting Ratings');
            const data = await resp.json();
            setRatings(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}