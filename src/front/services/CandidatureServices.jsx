import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const CandidatureServices = () => {   
    
    
    const [candidatures, setCandidatures] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getCandidatures()
    }, [])


    // GETs list of Candidatures
    const getCandidatures = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/candidatures')
            if (!resp.ok) throw new Error('error getting Candidatures');
            const data = await resp.json();
            setCandidatures(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}