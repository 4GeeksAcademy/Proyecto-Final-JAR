import React, { useEffect, useState } from "react";

//Asyncronous fetch
export const ProfessionalServices = () => {   
    
    
    const [professionals, setProfessionals] = useState()
    useEffect(() => {
        console.log("Component Loading")
        getProfessionals()
    }, [])


    // GETs list of Professionals
    const getProfessionals = async () => {
        try {
            const resp = await fetch('https://improved-spork-7rw667jq57p3wrx9-3001.app.github.dev/api/professionals')
            if (!resp.ok) throw new Error('error getting professionals');
            const data = await resp.json();
            setProfessionals(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        
        }
    };


}